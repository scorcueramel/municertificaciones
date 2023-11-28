import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TiposHabilitaciones } from '@core/interfaces/tipos-habilitaciones';
import { TiposVias } from '@core/interfaces/tipos-vias';
import { TiposHabilitacionesUrbanasService } from '@core/services/tablas/tipos-habilitaciones-urbanas.service';
import { TiposViasService } from '@core/services/tablas/tipos-vias.service';
import { SwalService } from '@core/services/resources/swal.service';
import { ViasHaburb } from '@core/interfaces/vias-haburb';
import { ConsultasService } from '@core/services/tablas/consultas.service';

@Component({
  selector: 'app-vias',
  templateUrl: './vias.component.html',
  styleUrls: ['./vias.component.css'],
})
export class ViasComponent implements OnInit, OnDestroy {
  @ViewChild('codigoHB') codigoHB!: ElementRef<HTMLElement>;
  @ViewChild('codigoHBLabel') codigoHBLabel!: ElementRef<HTMLElement>;
  @ViewChild('formButtonSearch') formButtonSearch!: ElementRef<HTMLElement>;
  @ViewChild('codigoVia') codigoVia!: ElementRef<HTMLElement>;
  @ViewChild('codigoViaLabel') codigoViaLabel!: ElementRef<HTMLElement>;

  constructor(
    private _tiposHabUrb: TiposHabilitacionesUrbanasService,
    private _tiposVias: TiposViasService,
    private _consultas: ConsultasService,
    private _swal: SwalService,
    private elementRef: ElementRef,
    private render2: Renderer2
  ) {}

  // Validador de carga del sevicio para los selects
  exitoCarga: boolean = false;
  errorCarga: boolean = false;
  // Validador largo del codigo de habilitación urbana
  validadorHU: boolean = false;
  // Validador largo del codigo de vía
  validadorVIA: boolean = false;
  // Validador de datos obtenidos luego de la consulta con el fin de mostrar la tabla
  dataObtenida: boolean = false;
  // Validador de datos sin resultado
  sinResultados: boolean = false;

  // Contenido del toast en caso de error al conectar el sevicio
  tituloToast!: string;
  cuerpoToast!: string;
  // Titulo del tabla resultante de la busqueda
  tituloTabla!: string;

  // Llenar los selects para selecionar tipo habilicaion y tipo vía
  listTiposHabUrb: TiposHabilitaciones[] = [];
  listTiposVias: TiposVias[] = [];

  // Objeto para emitir busqueda
  viaHabUrb: ViasHaburb = {
    CHRCURCODIGO: '',
    INTTCUCODIGO: '',
    VCHVIADESCRIPCION: '',
    VCHTVIDESCRIPCION: '',
    VCHVIACODIGO: '',
    VCHCURDESCRIPCION1: '',
    VCHTCUDESCRIPCION: '',
    INTTVICODIGO: '',
  };
  // Lista para almacenar datos obtenidos luego de la busqueda
  listaViasHus: ViasHaburb[] = [];

  //valores para llena la tabla pluego de la consulta
  cabecerasYfooterTabla: any[] = [];
  cuerpoTabla: any[] = [];

  // Valores para resultados sin datos
  icono!: string;
  texto!: string;

  consultarViasHabilitaciones(): void {
    let arregloResultado: any[];
    this._swal.wait();
    this._consultas.getViaHUByParam(this.viaHabUrb).subscribe({
      next: (resp: any) => {
        this.tituloTabla = 'HABILITACIONES URBANAS Y VÍAS';
        this.cabecerasYfooterTabla = [
          'COD. HAB.',
          'TIPO DE HABILITACIÓN',
          'NOMBRE DE HABILITACIÓN',
          'COD. VÍA',
          'TIPO DE VÍA',
          'NOMBRE VÍA',
        ];

        arregloResultado = resp.contenido;

        if (arregloResultado.length > 0) {
          this.cuerpoTabla = arregloResultado.sort((a, b) => {
            if (a.CHRCURCODIGO > b.CHRCURCODIGO) {
              return 1;
            }
            if (a.CHRCURCODIGO < b.CHRCURCODIGO) {
              return -1;
            }
            return 0;
          });
          this.dataObtenida = true;
          this.sinResultados = false;
        } else {
          this.sinResultados = true;
          this.dataObtenida = false;
          this.cuerpoTabla = [];
          this.icono = './assets/img/icons/sorprendido.png';
          this.texto = 'SIN RESULTADOS PARA TU BÚSQUEDA';
        }

        this._swal.close();
      },
      error: (err: any) => {
        console.log(err);
        this._swal.close();
      },
    });
  }

  ngOnInit(): void {
    this.getTypesHabUrb();
    this.getTypesVias();
  }

  getTypesHabUrb(): void {
    this._tiposHabUrb.getAllTypeHabilitacionesUrbanas().subscribe({
      next: (resp: any) => {
        this.listTiposHabUrb = resp.contenido;
      },
      error: (err: any) => {
        this.errorCarga = true;
        this.tituloToast = 'Oooooppppss!!';
        this.cuerpoToast = `Error al cargar el servicio : ${err.message}`;
        console.log(err);
      },
    });
  }

  getTypesVias(): void {
    this._tiposVias.getAllTypeVias().subscribe({
      next: (resp: any) => {
        this.listTiposVias = resp.contenido;
      },
      error: (err: any) => {
        this.errorCarga = true;
        this.tituloToast = 'Oooooppppss!!';
        this.cuerpoToast = `Error al cargar el servicio : ${err.message}`;
        console.log(err);
      },
    });
  }

  validarLargoHU(event: any): void {
    let largoCodigoHU = event.target.value.length;

    const valLengthCodHB =
      this.elementRef.nativeElement.querySelector('#cod_hab_urb');
    const codHBLabel =
      this.elementRef.nativeElement.querySelector('.form__label__hu');
    const formButtonSearch = this.elementRef.nativeElement.querySelector(
      '.card__button__search'
    );

    if (largoCodigoHU > 3) {
      this.validadorHU = true;
      this.render2.setStyle(valLengthCodHB, 'border', '1px solid red');
      this.render2.addClass(codHBLabel, 'text-danger');
      this.render2.setAttribute(formButtonSearch, 'disabled', 'disabled');
    } else {
      this.validadorHU = false;
      this.render2.removeStyle(valLengthCodHB, 'border');
      this.render2.removeClass(codHBLabel, 'text-danger');
      this.render2.removeAttribute(formButtonSearch, 'disabled');
    }
  }

  validarLargoVIA(event: any): void {
    let largoCodigoVia = event.target.value.length;

    const valLengthCodVia =
      this.elementRef.nativeElement.querySelector('#cod_via');
    const codViaLabel =
      this.elementRef.nativeElement.querySelector('.form__label__via');
    const formButtonSearch = this.elementRef.nativeElement.querySelector(
      '.card__button__search'
    );

    if (largoCodigoVia > 4) {
      this.validadorVIA = true;
      this.render2.setStyle(valLengthCodVia, 'border', '1px solid red');
      this.render2.addClass(codViaLabel, 'text-danger');
      this.render2.setAttribute(formButtonSearch, 'disabled', 'disabled');
    } else {
      this.validadorVIA = false;
      this.render2.removeStyle(valLengthCodVia, 'border');
      this.render2.removeClass(codViaLabel, 'text-danger');
      this.render2.removeAttribute(formButtonSearch, 'disabled');
    }
  }

  limpiarBusqueda(): void {
    const valLengthCodHB =
      this.elementRef.nativeElement.querySelector('#cod_hab_urb');
    const codHBLabel =
      this.elementRef.nativeElement.querySelector('.form__label__hu');
    const valLengthCodVia =
      this.elementRef.nativeElement.querySelector('#cod_via');
    const codViaLabel =
      this.elementRef.nativeElement.querySelector('.form__label__via');
    const formButtonSearch = this.elementRef.nativeElement.querySelector(
      '.card__button__search'
    );
    this.render2.removeStyle(valLengthCodHB, 'border');
    this.render2.removeClass(codHBLabel, 'text-danger');
    this.render2.removeStyle(valLengthCodVia, 'border');
    this.render2.removeClass(codViaLabel, 'text-danger');
    this.render2.removeAttribute(formButtonSearch, 'disabled');

    this.validadorHU = false;
    this.validadorVIA = false;
    this.tituloTabla = '';
    this.cuerpoTabla = [];
    this.cabecerasYfooterTabla = [];

    this.dataObtenida = false;
    this.sinResultados = false;

    this.viaHabUrb = {
      CHRCURCODIGO: '',
      INTTCUCODIGO: '',
      VCHVIADESCRIPCION: '',
      VCHTVIDESCRIPCION: '',
      VCHVIACODIGO: '',
      VCHCURDESCRIPCION1: '',
      VCHTCUDESCRIPCION: '',
      INTTVICODIGO: '',
    };
  }

  ngOnDestroy(): void {
    // Todo lo que se encuentra dentro se ejecuta una vez se destruye el componente.
    this.cuerpoTabla = [];
  }
}
