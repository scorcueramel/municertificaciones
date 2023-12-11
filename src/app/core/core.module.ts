import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorHuPipe } from './pipes/buscador-hu.pipe';
import { BuscadorViasPipe } from './pipes/buscador-vias.pipe';
import { SafeUrlsPipe } from './pipes/safe-urls.pipe';


@NgModule({
  declarations: [
    BuscadorHuPipe,
    BuscadorViasPipe,
    SafeUrlsPipe
  ],
  imports: [CommonModule],
  exports: [
    BuscadorHuPipe,
    BuscadorViasPipe,
    SafeUrlsPipe
  ]
})
export class CoreModule {}
