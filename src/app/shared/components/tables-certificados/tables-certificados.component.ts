import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CertificadosNumeracionService } from '@core/services/procesos/certificados-numeracion.service';
import { SwalService } from '@core/services/resources/swal.service';
import * as XLSX from 'xlsx';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tables-certificados',
  templateUrl: './tables-certificados.component.html',
  styleUrls: ['./tables-certificados.component.css'],
})
export class TablesCertificadosComponent {
  @Input() tituloTabla: string = '';
  @Input() cabecerasYfooterTabla: any[] = [];
  @Input() cuerpoTabla: any[] = [];

  @ViewChild('tableHu') tableHu!: ElementRef<HTMLElement>;

  private modalService = inject(NgbModal);

  constructor(
    private elementRef: ElementRef,
    private _certificados: CertificadosNumeracionService,
    private _swal: SwalService
  ) {}

  searchText = '';
  rutaPDF: any;

  limpiarFiltro(): void {
    this.searchText = '';
  }
  imprimir(codigo: any, content: TemplateRef<any>): void {
    this._swal.wait();
    this._certificados.generateCodeForPrint(codigo).subscribe({
      next: (resp: any) => {
        // window.open(`http://172.16.2.28:8070/reportesSATTI/reporteSATTI.rep?intreporteid=${resp.codigo}`,'_blank');
        this.rutaPDF = `http://172.16.2.28:8070/reportesSATTI/reporteSATTI.rep?intreporteid=${resp.codigo}`;
        this.modalService.open(content, { size: 'xl' });

        // let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        // width=0,height=0,left=-1000,top=-1000`;

        // open(
        //   `http://172.16.2.28:8070/reportesSATTI/reporteSATTI.rep?intreporteid=${resp.codigo}`,
        //   'test',
        //   params
        // );
        this._swal.close();
      },
      error: (err) => {
        this._swal.close();
        console.log(err);
      },
    });
  }

  exportarExcel(): void {
    const tableHu = this.elementRef.nativeElement.querySelector(
      '#table_certificados'
    );
    let date = new Date();
    let fileName = `Exportación CERTIFICACIONES - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.xlsx`;

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableHu);
    const book: XLSX.WorkBook = XLSX.utils.book_new();

    worksheet['!cols'] = [{ wch: 9 }, { wch: 30 }, { wch: 60 }, { wch: 9 }];

    XLSX.utils.book_append_sheet(
      book,
      worksheet,
      'Exportación de CERTIFICACIONES'
    );
    XLSX.writeFile(book, fileName, { compression: true });
  }
}
