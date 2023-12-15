import { Component, OnDestroy } from '@angular/core';
import { ConsultasService } from '@core/services/tablas/consultas.service';
import { SwalService } from '@core/services/resources/swal.service';
import { ViasHaburb } from '@core/interfaces/vias-haburb';

@Component({
  selector: 'app-habilitaciones-urbanas',
  templateUrl: './habilitaciones-urbanas.component.html',
  styleUrls: ['./habilitaciones-urbanas.component.css'],
})
export class HabilitacionesUrbanasComponent implements OnDestroy {
  constructor(
    private _consultas: ConsultasService,
    private _swal: SwalService
  ) {}

  errorCarga: boolean = false;

  dataObtnida: boolean = false;
  sinResultados: boolean = false;

  ItipoHU: ViasHaburb = {
    CHRCURCODIGO: '',
    VCHCURDESCRIPCION: '',
    INTTCUCODIGO: '',
  };

  tituloToast!: string;
  cuerpoToast!: string;

  tituloTabla!: string;
  cabecerasYfooterTabla: any[] = [];
  cuerpoTabla: any[] = [];

  icono: string = '';
  texto: string = '';

  validarVacios(): boolean {
    let chrcurcodigo = this.ItipoHU.CHRCURCODIGO;
    let vchcurdescripcion1 = this.ItipoHU.VCHCURDESCRIPCION;
    if (chrcurcodigo != '' || vchcurdescripcion1 != '') {
      return true;
    }
    return false;
  }

  consutlarHabilitacion(): void {
    if(this.validarVacios()){
      let arregloOrdenado: any[];
      this._swal.wait();
      this._consultas.getHUByParam(this.ItipoHU).subscribe({
        next: (resp: any) => {
          this.tituloTabla = 'HABILITACIONES URBANAS';
          this.cabecerasYfooterTabla = ['CÓDIGO', 'TIPO', 'NOMBRE', 'ESTADO'];

          if (resp.codigo == '0') {
            arregloOrdenado = resp.contenido;

            if (arregloOrdenado.length > 0) {
              this.cuerpoTabla = arregloOrdenado.sort((a, b) => {
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
          } else {
            this.errorCarga = true;
            this.tituloToast = 'Oooooppppss!!';
            this.cuerpoToast = `Error al cargar el servicio : ${resp.mensaje}`;
          }
          this._swal.close();
        },
        error: (err: any) => {
          this.errorCarga = true;
          this.tituloToast = 'Oooooppppss!!';
          this.cuerpoToast = `Error al cargar el servicio : ${err.message}`;
          this._swal.close();
        },
      });
    }else {
      this.errorCarga = true;
      this.tituloToast = 'Wooow!';
      this.cuerpoToast = `Como mínimo debes ingresar un criterio para realizar tu búsqueda`;
      setTimeout(() => {
        this.errorCarga = false;
      }, 4000);
    }
  }

  limpiarBusqueda(): void {
    this.ItipoHU = {
      CHRCURCODIGO: '',
      VCHCURDESCRIPCION: '',
      INTTCUCODIGO: '',
    };

    this.tituloTabla = '';
    this.cuerpoTabla = [];
    this.cabecerasYfooterTabla = [];

    this.dataObtnida = false;
    this.sinResultados = false;
  }

  ngOnDestroy(): void {
    this.cuerpoTabla = [];
  }
}
