import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Certificado } from '@core/interfaces/certificado';
import { TiposVias } from '@core/interfaces/tipos-vias';
import { CertificadosNumeracionService } from '@core/services/procesos/certificados-numeracion.service';
import { SwalService } from '@core/services/resources/swal.service';
import {
  NgbDate,
  NgbDateParserFormatter,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-certificados-numeracion',
  templateUrl: './certificados-numeracion.component.html',
  styleUrls: ['./certificados-numeracion.component.css'],
})
export class CertificadosNumeracionComponent implements OnDestroy, OnInit {
  hoveredDate: NgbDate | any;
  fromDate: NgbDate | any;
  toDate: NgbDate | any;

  constructor(
    private _certificaciones: CertificadosNumeracionService,
    private _swal: SwalService,
    private modalService: NgbModal,
    public formatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {}

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

  listTiposVias: TiposVias[] = [];

  certificadoNum: Certificado = {
    CHRCERANIO: '',
    VCHCERNUMERO: '',
    VCHDOCCODIGO: '',
    VCHLOTCODIGO: '',
    VCHCURDESCRIPCION: '',
    VCHCERSOLICITANTE: '',
    VCHTVIDESCRIPCION: '',
    DATFECHADESDE: '',
    DATFECHAHASTA: '',
  };

  ANIO!: any;
  FECHA!: any;

  openModalCreate(content1: TemplateRef<any>) {
    this.modalService.open(content1, { fullscreen: true });
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);
    let nuvafecha = hoy.toISOString().split('T');
    this.FECHA = nuvafecha[0];
    this.ANIO = hoy.getFullYear();
  }

  openModalSearch(content2: TemplateRef<any>) {
    this.modalService.open(content2, { size: 'xl' });
  }

  actualizaFecha(): void {
    let anio = this.FECHA;
    this.ANIO = anio.slice(0, 4);
  }

  validarCamposVacios(): boolean {
    let fecha_inicial = this.certificadoNum.DATFECHAHASTA;
    let fecha_final = this.certificadoNum.DATFECHADESDE;
    let vchdoccodigo = this.certificadoNum.VCHDOCCODIGO;
    let vchlotcodigo = this.certificadoNum.VCHLOTCODIGO;
    let vchcurdescripcion = this.certificadoNum.VCHCURDESCRIPCION;
    let vchcersolicitante = this.certificadoNum.VCHCERSOLICITANTE;
    let vchtvidescripcion = this.certificadoNum.VCHTVIDESCRIPCION;

    if (
      fecha_inicial != '' ||
      fecha_final != '' ||
      vchdoccodigo != '' ||
      vchlotcodigo != '' ||
      vchcurdescripcion != '' ||
      vchcersolicitante != '' ||
      vchtvidescripcion != ''
    ) {
      return true;
    }
    return false;
  }

  consultarCertificado(): void {
    let arregloOrdenado: any[];
    if (this.validarCamposVacios()) {
      this._swal.wait();
      this._certificaciones.getPadronByParam(this.certificadoNum).subscribe({
        next: (resp: any) => {
          this.tituloTabla = 'CERTIFICADOS DE NUMERACIÓN';
          this.cabecerasYfooterTabla = [
            'OPC.',
            'AÑO',
            'N° CERTIFICADO',
            'ESTADO',
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
    } else {
      this.errorCarga = true;
      this.tituloToast = 'Wooow!';
      this.cuerpoToast = `Como mínimo debes ingresar un criterio para realizar tu búsqueda`;
      setTimeout(() => {
        this.errorCarga = false;
      }, 4000);
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.fromDate != null && this.toDate != null) {
      this.certificadoNum.DATFECHADESDE = `${this.fromDate.day}/${this.fromDate.month}/${this.fromDate.year}`;
      this.certificadoNum.DATFECHAHASTA = `${this.toDate.day}/${this.toDate.month}/${this.toDate.year}`;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  limpiarBusqueda(): void {
    this.certificadoNum = {
      CHRCERANIO: '',
      VCHCERNUMERO: '',
      VCHDOCCODIGO: '',
      VCHLOTCODIGO: '',
      VCHCURDESCRIPCION: '',
      VCHCERSOLICITANTE: '',
      VCHTVIDESCRIPCION: '',
      DATFECHAHASTA: '',
      DATFECHADESDE: '',
    };

    this.tituloTabla = '';
    this.cuerpoTabla = [];
    this.cabecerasYfooterTabla = [];

    this.dataObtnida = false;
    this.sinResultados = false;
  }

  ngOnDestroy(): void {}
}
