import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PanelRoutingModule } from './panel-routing.module';

import { AsideComponent } from './aside/aside.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { PanelComponent } from './panel.component';
import { ViasComponent } from '@pages/components/vias/vias.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HabilitacionesUrbanasComponent } from '@pages/components/habilitaciones-urbanas/habilitaciones-urbanas.component';
import { CoreModule } from '@core/core.module';
import { CertificadosNumeracionComponent } from '@pages/components/certificados-numeracion/certificados-numeracion.component';
import { LoginComponent } from '@pages/auth/login/login.component';
import { PadronNumeracionComponent } from '@pages/components/padron-numeracion/padron-numeracion.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AsideComponent,
    NavbarComponent,
    ContentComponent,
    PanelComponent,
    ViasComponent,
    HabilitacionesUrbanasComponent,
    CertificadosNumeracionComponent,
    PadronNumeracionComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgbDatepickerModule,
    NgbTooltipModule
  ],
  exports: [
    AsideComponent,
    NavbarComponent,
    ContentComponent,
    PanelComponent,
    ViasComponent,
    HabilitacionesUrbanasComponent,
    CertificadosNumeracionComponent,
    PadronNumeracionComponent,
    LoginComponent,
  ],
})
export class PanelModule {}
