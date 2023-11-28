import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorHuPipe } from './pipes/buscador-hu.pipe';
import { BuscadorViasPipe } from './pipes/buscador-vias.pipe';


@NgModule({
  declarations: [
    BuscadorHuPipe,
    BuscadorViasPipe
  ],
  imports: [CommonModule],
  exports: [
    BuscadorHuPipe,
    BuscadorViasPipe
  ]
})
export class CoreModule {}
