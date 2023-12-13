import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TiposHabilitaciones } from '@core/interfaces/tipos-habilitaciones';
import { TiposVias } from '@core/interfaces/tipos-vias';
import { ViasHaburb } from '@core/interfaces/vias-haburb';
import { SwalService } from '@core/services/resources/swal.service';
import { ConsultasService } from '@core/services/tablas/consultas.service';
import { TiposHabilitacionesUrbanasService } from '@core/services/tablas/tipos-habilitaciones-urbanas.service';
import { TiposViasService } from '@core/services/tablas/tipos-vias.service';

@Component({
  selector: 'app-hu-vias',
  templateUrl: './hu-vias.component.html',
  styleUrls: ['./hu-vias.component.css']
})
export class HuViasComponent {
  @ViewChild('codigoHUInput') codigoHUInput!: ElementRef<HTMLElement>;

  constructor(
    private _tiposHabUrb: TiposHabilitacionesUrbanasService,
    private _tiposVias: TiposViasService,
    private _consultas: ConsultasService,
    private _swal: SwalService,
    private render2: Renderer2,
    private elementRef: ElementRef
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
    VCHCURDESCRIPCION: '',
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



    let arregloResultado: any[] = [];
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

        if (resp.codigo == '0') {
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
        } else {
          this.errorCarga = true;
          this.tituloToast = 'Oooooppppss!!';
          this.cuerpoToast = `Error al cargar el servicio : ${resp.mensaje}`;
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

  limpiarBusqueda(): void {
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
      VCHCURDESCRIPCION: '',
      VCHTCUDESCRIPCION: '',
      INTTVICODIGO: '',
    };
  }

  ngOnDestroy(): void {
    // Todo lo que se encuentra dentro se ejecuta una vez se destruye el componente.
    this.cuerpoTabla = [];
  }
}
