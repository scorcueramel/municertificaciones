import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from './cargar-scripts.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private _cargaScripts : CargarScriptsService
  ){}

  ngOnInit(): void {
    this._cargaScripts.CargaScripts();
  }
}
