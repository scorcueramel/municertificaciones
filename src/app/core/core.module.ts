import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorHuPipe } from './pipes/buscador-hu.pipe';
import { BuscadorViasPipe } from './pipes/buscador-vias.pipe';
import { SafeUrlsPipe } from './pipes/safe-urls.pipe';
import { BuscadorCertificacionesPipe } from './pipes/buscador-certificaciones.pipe';


@NgModule({
  declarations: [
    BuscadorHuPipe,
    BuscadorViasPipe,
    SafeUrlsPipe,
    BuscadorCertificacionesPipe
  ],
  imports: [CommonModule],
  exports: [
    BuscadorHuPipe,
    BuscadorViasPipe,
    SafeUrlsPipe,
    BuscadorCertificacionesPipe
  ]
})
export class CoreModule {}
