import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Padron } from '@core/interfaces/padron';
import { PadronResp } from '@core/interfaces/padron-resp';
import { PadronService } from '@core/services/procesos/padron.service';
import { SwalService } from '@core/services/resources/swal.service';
import { ConsultasService } from '@core/services/tablas/consultas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLXS from 'xlsx';

@Component({
  selector: 'app-tables-via-hu',
  templateUrl: './tables-via-hu.component.html',
  styleUrls: ['./tables-via-hu.component.css'],
})
export class TablesViaHuComponent {
  @Input() tituloTabla: string = '';
  @Input() cabecerasYfooterTabla: any[] = [];
  @Input() cuerpoTabla: any[] = [];

  @Input() identificador: boolean;

  @ViewChild('tableViaHU') tableViaHU!: ElementRef<HTMLElement>;

  constructor(
    private elementRef: ElementRef,
    private modalService: NgbModal,
    private _padron: PadronService,
    private _swal: SwalService,
    private _consultas: ConsultasService
  ) {}

  searchText = '';

  limpiarFiltro(): void {
    this.searchText = '';
  }

  // para rellenar el campo habilriacion / via desde la respuesta de la búsqeuda
  habilitacionVia: string;
  // Entidad padron para realizar consultas
  padronConsultas: Padron = {
    CHRCURCODIGO: '',
    VCHVIACODIGO: '',
    VCHRANCUADRA: '',
    VCHMZANUMERO: '',
    VCHLOTNUMERO: '',
    VCHLOTCODIGO: '',
  };
  // Entidad padron para respuesta de la consutlas
  padronRespuesta: PadronResp = {
    VCHTLIMDESCRIPCION: '',
    CHRCURCODIGO: '',
    VCHSLTNUMERO: '',
    SMLRANINFERIOR: '',
    VCHRANCUADRA: '',
    VCHLOTCODIGO: '',
    SMLRANSUPERIOR: '',
    CHRTLIMCODIGO: '',
    VCHVIACODIGO: '',
    VCHMZANUMERO: '',
    VCHLOTNUMERO: '',
  };

  // Arreglo para data general
  IPadronRespuesta: PadronResp[] = [];
  // Arreglo para almacenar las cuadras
  cuadras: any[] = [];
  // Arreglo para los lados (DE-IZ)
  ladoIzquierdo: any[] = [];
  ladoDerecho: any[] = [];
  // Arreglo para almacenar las manzanas
  manzanas: any[] = [];
  // Arreglo para obtener la vías por habilitación
  viasXhabilitacion: any[] = [];

  withOutFocus(): void {
    let elemento = this.elementRef.nativeElement.querySelector('.buscador');
    setTimeout(() => {
      elemento.focus(), 0;
    }, 0);
  }

  openListarLotes(content1: TemplateRef<any>, cuerpo: any) {
    this._swal.wait();

    let arregloRespuesta: any[] = [];
    let cuadrasObtenidas: any[] = []; //DATA
    let cuadrasRespuesta: any[] = []; //RESULT

    this.modalService.open(content1, { size: 'xl' });
    this.habilitacionVia = `${cuerpo.CHRCURCODIGO} - ${cuerpo.VCHCURDESCRIPCION} / ${cuerpo.VCHVIACODIGO} - ${cuerpo.VCHVIADESCRIPCION}`;
    this.padronConsultas.CHRCURCODIGO = cuerpo.CHRCURCODIGO;
    this.padronConsultas.VCHVIACODIGO = cuerpo.VCHVIACODIGO;

    this._padron.getPadronByParams(this.padronConsultas).subscribe({
      next: (resp: any) => {
        this.IPadronRespuesta = resp.contenido;
        arregloRespuesta = resp.contenido;

        arregloRespuesta.forEach((c) => {
          cuadrasObtenidas.push(c.VCHRANCUADRA);
          if (c.CHRTLIMCODIGO != 'DE') {
            this.ladoDerecho.push(c);
          } else if (c.CHRTLIMCODIGO != 'IZ') {
            this.ladoIzquierdo.push(c);
          }
        });

        cuadrasRespuesta = cuadrasObtenidas.filter((item, index) => {
          return cuadrasObtenidas.indexOf(item) === index;
        });

        if (cuadrasRespuesta.length > 0) {
          this.cuadras = cuadrasRespuesta;
        }

        this._swal.close();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openBuscarLotes(content2: TemplateRef<any>, cuerpo: any) {
    this._swal.wait();

    let arregloRespuesta: any[] = [];
    let manzanasObtenidas: any[] = []; //DATA
    let manzanasRespuesta: any[] = []; //RESULT

    this.modalService.open(content2, { size: 'xl' });
    this.habilitacionVia = `${cuerpo.VCHCURDESCRIPCION}`;
    this.padronConsultas.CHRCURCODIGO = cuerpo.CHRCURCODIGO;
    this.padronConsultas.VCHVIACODIGO = cuerpo.VCHVIACODIGO;

    this._padron.getPadronByParams(this.padronConsultas).subscribe({
      next: (resp: any) => {
        arregloRespuesta = resp.contenido;

          arregloRespuesta.forEach((m) => {
            manzanasObtenidas.push(m.VCHMZANUMERO);
          });

          manzanasRespuesta = manzanasObtenidas.filter((item, index) => {
            return manzanasObtenidas.indexOf(item) === index;
          });

          this.manzanas = manzanasRespuesta.sort();
          console.log(arregloRespuesta);

        this._swal.close();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  filtroPorManzana(): void {}

  openSeleccionRangos(content3: TemplateRef<any>, lado: any): void {
    this.modalService.open(content3, { size: 'xl' });
    this.IPadronRespuesta = lado;
  }

  habilitacionPorCuadra(event: any): void {
    let nroCuadra = event.target.value;
    this.ladoDerecho = [];
    this.ladoIzquierdo = [];
    this.IPadronRespuesta.forEach((c) => {
      if (c.VCHRANCUADRA === nroCuadra && c.CHRTLIMCODIGO != 'DE') {
        this.ladoDerecho.push(c);
      } else if (c.VCHRANCUADRA === nroCuadra && c.CHRTLIMCODIGO != 'IZ') {
        this.ladoIzquierdo.push(c);
      } else if (nroCuadra === '' && c.CHRTLIMCODIGO != 'DE') {
        this.ladoDerecho.push(c);
      } else if (nroCuadra === '' && c.CHRTLIMCODIGO != 'IZ') {
        this.ladoIzquierdo.push(c);
      }
    });
  }

  exportarExcel(): void {
    const tableViaHU =
      this.elementRef.nativeElement.querySelector('#table_via_hu');
    let date = new Date();
    let fileName = `Exportacion Vías - Hablitaciones Urbanas - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.xlsx`;

    const worksheet: XLXS.WorkSheet = XLXS.utils.table_to_sheet(tableViaHU);
    const book: XLXS.WorkBook = XLXS.utils.book_new();

    worksheet['!cols'] = [{ wch: 9 }, { wch: 30 }, { wch: 60 }, { wch: 9 }];

    XLXS.utils.book_append_sheet(book, worksheet, 'Exportación Hab. - Vías');
    XLXS.writeFile(book, fileName, { compression: true });
  }
}
