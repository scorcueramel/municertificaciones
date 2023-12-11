import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EMPTY_STRING, EXTERNAL_PATHS, INTERNAL_PATHS } from '@core/constants/router';
import { AuthModule } from '@pages/auth/auth.module';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

import { PanelModule } from '@pages/panel/panel.module';

const routes: Routes = [
  {
    path: EMPTY_STRING,
    children: [
      {
        path: EXTERNAL_PATHS.APP_AUTH,
        loadChildren: () =>
          import('@pages/auth/auth.module').then(
            (m): typeof AuthModule => m.AuthModule
          ),
      },
      {
        path: INTERNAL_PATHS.APP_PANEL,
        loadChildren: () =>
          import('@pages/panel/panel.module').then(
            (m): typeof PanelModule => m.PanelModule
          ),
      },
      {
        path: EXTERNAL_PATHS.APP_NOT_FOUND,
        component: NotFoundComponent
      },
      { path: EMPTY_STRING, redirectTo: EXTERNAL_PATHS.APP_AUTH, pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: EXTERNAL_PATHS.APP_NOT_FOUND, pathMatch: 'full', data: {title:'NO ENCONTRADO'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
