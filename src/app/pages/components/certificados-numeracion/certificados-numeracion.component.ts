import { Component, OnDestroy } from '@angular/core';
import { Certificado } from '@core/interfaces/certificado';
import { CertificadosNumeracionService } from '@core/services/procesos/certificados-numeracion.service';
import { SwalService } from '@core/services/resources/swal.service';

@Component({
  selector: 'app-certificados-numeracion',
  templateUrl: './certificados-numeracion.component.html',
  styleUrls: ['./certificados-numeracion.component.css'],
})
export class CertificadosNumeracionComponent implements OnDestroy {
  constructor(
    private _certificaciones: CertificadosNumeracionService,
    private _swal: SwalService
  ) {}

  // Validacion de solo numericos
  valSoloNumeroAnio: boolean = false;
  valSoloNumeroCert: boolean = false;
  valSoloNumeroExp: boolean = false;
  valSoloNumeroCodLote: boolean = false;
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
    let arregloOrdenado:any[];
    this._swal.wait();
    this._certificaciones.getByParamsNumberCertify(this.certificadoNum).subscribe({
      next:(resp:any)=>{
        this.tituloTabla = 'CERTIFICADOS DE NUMERACIÓN';
        this.cabecerasYfooterTabla = ['AÑO', 'CERTIFICADO', 'EXPEDIENTE', 'FECHA', 'HABILITACIÓN', 'VÍAS', 'MZ.', 'LT.', 'SUB. LT', 'SOLICITANTE', 'PROPIETARIO'];
        console.log(resp)
        this._swal.close();
      },
      error:(err:any)=>{
        this.errorCarga = true;
        this.tituloToast = 'Oooooppppss!!';
        this.cuerpoToast = `Error al cargar el servicio : ${err.message}`;
        this._swal.close();
      }
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
