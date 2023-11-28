import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastSuccessComponent } from './components/toast-success/toast-success.component';
import { ToastErrorsComponent } from './components/toast-errors/toast-errors.component';
import { TablesHuComponent } from './components/tables-hu/tables-hu.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TablesViaHuComponent } from './components/tables-via-hu/tables-via-hu.component';


@NgModule({
  declarations: [
    ToastSuccessComponent,
    ToastErrorsComponent,
    TablesHuComponent,
    EmptyDataComponent,
    TablesViaHuComponent
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
    EmptyDataComponent,
    TablesViaHuComponent
  ]
})
export class SharedModule { }
