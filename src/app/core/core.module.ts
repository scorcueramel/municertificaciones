import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorHuPipe } from './pipes/buscador-hu.pipe';


@NgModule({
  declarations: [
    BuscadorHuPipe
  ],
  imports: [CommonModule],
  exports: [
    BuscadorHuPipe
  ]
})
export class CoreModule {}
