import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-tables-padron-num',
  templateUrl: './tables-padron-num.component.html',
  styleUrls: ['./tables-padron-num.component.css']
})
export class TablesPadronNumComponent {
  @Input() tituloTabla: string = '';
  @Input() cabecerasYfooterTabla: any[] = [];
  @Input() cuerpoTabla: any[] = [];

  @ViewChild('tableHu') tableHu!: ElementRef<HTMLElement>;

  constructor(private elementRef: ElementRef) {}

  searchText = '';

  limpiarFiltro(): void {
    this.searchText = '';
  }

  exportarExcel(): void {
    const tableHu = this.elementRef.nativeElement.querySelector('#table_hu');
    let date = new Date();
    let fileName = `Exportacion HU - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.xlsx`;

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableHu);
    const book: XLSX.WorkBook = XLSX.utils.book_new();

    worksheet['!cols'] = [{ wch: 9 }, { wch: 30 }, { wch: 60 }, { wch: 9 }];

    XLSX.utils.book_append_sheet(book, worksheet, 'Exportacion HU');
    XLSX.writeFile(book, fileName, { compression:true });
  }
}
