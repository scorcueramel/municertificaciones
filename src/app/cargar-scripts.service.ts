import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CargarScriptsService {
  constructor() {}

  rutas: any = [
    '../../assets/vendor/libs/jquery/jquery.js',
    '../../assets/vendor/libs/popper/popper.js',
    '../../assets/vendor/js/helpers.js',
    '../../assets/js/config.js',
    '../../assets/vendor/js/bootstrap.js',
    '../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
    '../../assets/vendor/js/menu.js',
    '../../assets/vendor/libs/apex-charts/apexcharts.js',
    '../../assets/js/main.js',
    '../../assets/js/ui-toasts.js',
    '../../assets/js/ui-popover.js',
  ];

  CargaScripts() {
    for (let ruta of this.rutas) {
      let script = document.createElement("script");
      script.src = ruta;
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
}
