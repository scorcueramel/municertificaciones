import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { ViasComponent } from '@pages/components/vias/vias.component';
import { EMPTY_STRING, INTERNAL_PATHS } from '@core/constants/router';
import { HabilitacionesUrbanasComponent } from '@pages/components/habilitaciones-urbanas/habilitaciones-urbanas.component';
import { CertificadosNumeracionComponent } from '@pages/components/certificados-numeracion/certificados-numeracion.component';
import { PadronNumeracionComponent } from '@pages/components/padron-numeracion/padron-numeracion.component';

const routes: Routes = [
  {
    path: EMPTY_STRING,
    component: PanelComponent,
    children: [
      { path: INTERNAL_PATHS.APP_VIAS, component: ViasComponent },
      { path: INTERNAL_PATHS.APP_HU, component: HabilitacionesUrbanasComponent },
      { path: INTERNAL_PATHS.APP_CERT_NUM, component: CertificadosNumeracionComponent },
      { path: INTERNAL_PATHS.APP_PAD_NUM, component: PadronNumeracionComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
