import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { ViasComponent } from '@pages/components/vias/vias.component';
import { EMPTY_STRING, INTERNAL_PATHS } from '@core/constants/router';
import { HabilitacionesUrbanasComponent } from '@pages/components/habilitaciones-urbanas/habilitaciones-urbanas.component';
import { CertificadosNumeracionComponent } from '@pages/components/certificados-numeracion/certificados-numeracion.component';
import { PadronNumeracionComponent } from '@pages/components/padron-numeracion/padron-numeracion.component';
import { authGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: EMPTY_STRING,
    canActivate:[authGuard],
    component: PanelComponent,
    children: [
      { path: INTERNAL_PATHS.APP_VIAS, component: ViasComponent, data: {title:'VÍAS'} },
      { path: INTERNAL_PATHS.APP_HU, component: HabilitacionesUrbanasComponent, data: {title:'HU'} },
      { path: INTERNAL_PATHS.APP_CERT_NUM, component: CertificadosNumeracionComponent, data:{title:'CETIFICADOS'}},
      { path: INTERNAL_PATHS.APP_PAD_NUM, component: PadronNumeracionComponent, data:{title:'PADRÓN'} },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
