import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Certificado } from '@core/interfaces/certificado';
import { CertificadosNumeracionService } from '@core/services/procesos/certificados-numeracion.service';
import { SwalService } from '@core/services/resources/swal.service';

@Component({
  selector: 'app-certificados-numeracion',
  templateUrl: './certificados-numeracion.component.html',
  styleUrls: ['./certificados-numeracion.component.css'],
})
export class CertificadosNumeracionComponent implements OnDestroy {
  @ViewChild('btnSearch') btnSarch: ElementRef<HTMLElement>;
  @ViewChild('btnClean') btnClean: ElementRef<HTMLElement>;

  constructor(
    private _certificaciones: CertificadosNumeracionService,
    private _swal: SwalService,
    private elementRef: ElementRef,
    private render2: Renderer2
  ) {}

  // Valida respuesta del servicio
  errorCarga: boolean = false;
  // Valida obtension de data post consulta
  dataObtnida: boolean = false;
  sinResultados: boolean = false;

  // estructura de alerta (TOAST)
  tituloToast!: string;
  cuerpoToast!: string;

  // Estructura de tabla resultante de consulta
  tituloTabla!: string;
  cabecerasYfooterTabla: any[] = [];
  cuerpoTabla: any[] = [];

  // Gestion de búsqueda vacía
  icono: string = '';
  texto: string = '';

  certificadoNum: Certificado = {
    CHRCERANIO: '',
    VCHCERNUMERO: '',
    VCHDOCCODIGO: '',
    VCHLOTCODIGO: '',
    VCHCURDESCRIPCION: '',
    VCHCERSOLICITANTE: '',
  };

  consultarCertificado(): void {
    let arregloOrdenado: any[];
    this._swal.wait();
    this._certificaciones.getPadronByParam(this.certificadoNum).subscribe({
      next: (resp: any) => {
        this.tituloTabla = 'CERTIFICADOS DE NUMERACIÓN';
        this.cabecerasYfooterTabla = [
          'OPC.',
          'AÑO',
          'N° CERTIFICADO',
          'EXPEDIENTE',
          'TIPO HAB.',
          'HAB. URBANA',
          'MZ.',
          'LT.',
          'SOLICITANTE',
          'LT. CATASTRAL',
        ];

        arregloOrdenado = resp.contenido.contenido;

        if (arregloOrdenado.length > 0) {
          this.cuerpoTabla = arregloOrdenado.sort((a, b) => {
            if (a.INTCERCODIGO > b.INTCERCODIGO) {
              return 1;
            }
            if (a.INTCERCODIGO < b.INTCERCODIGO) {
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
        this._swal.close();
      },
    });
  }

  limpiarBusqueda(): void {
    this.certificadoNum = {};

    this.tituloTabla = '';
    this.cuerpoTabla = [];
    this.cabecerasYfooterTabla = [];

    this.dataObtnida = false;
    this.sinResultados = false;
  }

  ngOnDestroy(): void {}
}
