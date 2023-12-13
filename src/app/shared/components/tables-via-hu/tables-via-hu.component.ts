import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as XLXS from 'xlsx';

@Component({
  selector: 'app-tables-via-hu',
  templateUrl: './tables-via-hu.component.html',
  styleUrls: ['./tables-via-hu.component.css']
})
export class TablesViaHuComponent {
  @Input() tituloTabla:string = '';
  @Input() cabecerasYfooterTabla: any[]=[];
  @Input() cuerpoTabla: any[] = [];

  @Input() identificador:boolean;

  @ViewChild('tableViaHU') tableViaHU!: ElementRef<HTMLElement>;

  constructor(
    private elementRef:ElementRef
  ){ }

  searchText = '';

  limpiarFiltro():void{
    this.searchText = '';
  }

  exportarExcel():void{
    const tableViaHU = this.elementRef.nativeElement.querySelector('#table_via_hu');
    let date = new Date();
    let fileName = `Exportacion Vías - Hablitaciones Urbanas - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.xlsx`;

    const worksheet : XLXS.WorkSheet = XLXS.utils.table_to_sheet(tableViaHU);
    const book: XLXS.WorkBook = XLXS.utils.book_new();

    worksheet['!cols'] = [{ wch: 9 }, { wch: 30 }, { wch: 60 }, { wch: 9 }];

    XLXS.utils.book_append_sheet(book,worksheet,'Exportación Hab. - Vías');
    XLXS.writeFile(book,fileName,{compression:true});
  }

}
