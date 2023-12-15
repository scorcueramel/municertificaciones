import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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

  constructor(private elementRef: ElementRef, private modalService: NgbModal) {}

  searchText = '';

  limpiarFiltro(): void {
    this.searchText = '';
  }

  // para rellenar el campo habilriacion / via desde la respuesta de la búsqeuda
  habilitacionVia: string;

  withOutFocus(): void {
    let elemento = this.elementRef.nativeElement.querySelector('.buscador');
    setTimeout(() => {
      elemento.focus(), 0;
    }, 0);
  }

  openListarLotes(content1: TemplateRef<any>, cuerpo: any) {
    this.modalService.open(content1, { size: 'xl' });
    this.habilitacionVia = `${cuerpo.CHRCURCODIGO} - ${cuerpo.VCHCURDESCRIPCION} / ${cuerpo.VCHVIACODIGO} - ${cuerpo.VCHVIADESCRIPCION}`;
  }

  openBuscarLotes(content2: TemplateRef<any>) {
    this.modalService.open(content2, { size: 'xl' });
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
