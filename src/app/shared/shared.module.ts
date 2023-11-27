import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastSuccessComponent } from './components/toast-success/toast-success.component';
import { ToastErrorsComponent } from './components/toast-errors/toast-errors.component';
import { TablesHuComponent } from './components/tables-hu/tables-hu.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ToastSuccessComponent,
    ToastErrorsComponent,
    TablesHuComponent,
    TablesHuComponent,
    EmptyDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,

    NgbTooltipModule
  ],
  exports: [
    ToastSuccessComponent,
    ToastErrorsComponent,
    TablesHuComponent,
    EmptyDataComponent
  ]
})
export class SharedModule { }
