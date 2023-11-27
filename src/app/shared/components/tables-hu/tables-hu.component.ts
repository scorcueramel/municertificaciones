import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tables-hu',
  templateUrl: './tables-hu.component.html',
  styleUrls: ['./tables-hu.component.css']
})
export class TablesHuComponent {
  @Input() tituloTabla: string = '';
  @Input() cabecerasYfooterTabla:any[] = [];
  @Input() cuerpoTabla:any[] = [];

  searchText = '';
  sinDatos:boolean = false;

  limpiarFiltro():void{
    this.searchText = '';
  }

}
