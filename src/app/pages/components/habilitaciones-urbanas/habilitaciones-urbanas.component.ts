import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TiposHabilitaciones } from '@core/interfaces/tipos-habilitaciones';
import { ConsultasService } from '@core/services/tablas/consultas.service';
import { SwalService } from '@core/services/resources/swal.service';
import { ViasHaburb } from '@core/interfaces/vias-haburb';

@Component({
  selector: 'app-habilitaciones-urbanas',
  templateUrl: './habilitaciones-urbanas.component.html',
  styleUrls: ['./habilitaciones-urbanas.component.css'],
})
export class HabilitacionesUrbanasComponent implements OnDestroy {
  @ViewChild('codigoHBInput') codigoHBInput!: ElementRef;
  @ViewChild('codigoHBLabel') codigoHBLabel!: ElementRef;
  @ViewChild('formButtonSearch') formButtonSearch!: ElementRef;

  constructor(
    private _consultas: ConsultasService,
    private _swal: SwalService,
    private render2: Renderer2
  ) {}

  errorCarga: boolean = false;
  valLargoCodigo: boolean = false;
  dataObtnida: boolean = false;
  sinResultados: boolean = false;

  ItipoHU: ViasHaburb = {
    CHRCURCODIGO: '',
    VCHCURDESCRIPCION1: '',
    INTTCUCODIGO: '',
  };

  tituloToast!: string;
  cuerpoToast!: string;

  tituloTabla!: string;
  cabecerasYfooterTabla: any[] = [];
  cuerpoTabla: any[] = [];

  icono: string = '';
  texto: string = '';

  consutlarHabilitacion(): void {
    let arregloOrdenado: any[];
    this._swal.wait();
    this._consultas.getHUByParam(this.ItipoHU).subscribe({
      next: (resp: any) => {
        this.tituloTabla = 'HABILITACIONES URBANAS';
        this.cabecerasYfooterTabla = ['CÓDIGO', 'TIPO', 'NOMBRE', 'ESTADO'];

        arregloOrdenado = resp.contenido;

        if (arregloOrdenado.length > 0) {
          this.cuerpoTabla = arregloOrdenado.sort((a, b) =>{
            if (a.CHRCURCODIGO > b.CHRCURCODIGO) {
              return 1;
            }
            if (a.CHRCURCODIGO < b.CHRCURCODIGO) {
              return -1;
            }
            return 0;
          });
          this.dataObtnida = true;
          this.sinResultados = false;
        } else {
          this.sinResultados = true;
          this.dataObtnida = false;
          this.cuerpoTabla = [];
          this.icono = './assets/img/icons/sorprendido.png';
          this.texto = 'SIN RESULTADOS PARA TU BÚSQUEDA';
        }

        this._swal.close();
      },
      error: (err: any) => {
        this.errorCarga = true;
        this.tituloToast = 'Oooooppppss!!';
        this.cuerpoToast = `Error al cargar el servicio : ${err.message}`;
        console.log(err);
        this._swal.close();
      },
    });
  }

  limpiarBusqueda(): void {
    const label = this.codigoHBLabel.nativeElement;
    const input = this.codigoHBInput.nativeElement;
    const boton = this.formButtonSearch.nativeElement;

    this.valLargoCodigo = false;
    this.render2.removeStyle(label, 'color');
    this.render2.removeStyle(input, 'border');
    this.render2.removeStyle(input, 'outline');
    this.render2.removeAttribute(boton, 'disabled');

    this.ItipoHU = {
      INTTCUCODIGO: '',
      CHRCURCODIGO: '',
      VCHCURDESCRIPCION1: '',
    };

    this.tituloTabla = '';
    this.cuerpoTabla = [];
    this.cabecerasYfooterTabla = [];

    this.dataObtnida = false;
    this.sinResultados = false;
  }

  validaLargo(event: Event): void {
    let largo = (event.target as HTMLInputElement).value;

    const label = this.codigoHBLabel.nativeElement;
    const input = this.codigoHBInput.nativeElement;
    const boton = this.formButtonSearch.nativeElement;

    if (largo.length > 3) {
      this.valLargoCodigo = true;
      this.render2.setStyle(label, 'color', 'red');
      this.render2.setStyle(input, 'border', '1px solid red');
      this.render2.setStyle(input, 'outline', '0px');
      this.render2.setAttribute(boton, 'disabled', 'disabled');
    } else {
      this.valLargoCodigo = false;
      this.render2.removeStyle(label, 'color');
      this.render2.removeStyle(input, 'border');
      this.render2.removeStyle(input, 'outline');
      this.render2.removeAttribute(boton, 'disabled');
    }
  }

  ngOnDestroy(): void {
    // Todo lo que se encuentra dentro se ejecuta una vez se destruye el componente.
    this.cuerpoTabla = [];
  }
}
