import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CARGAR SCRIPTS DE LA PLANTILLA
import { CargarScriptsService } from './cargar-scripts.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from './pages/panel/panel.module';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderInterceptorService } from '@core/interceptors/header-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    NgbModule,
  ],
  providers: [
    CargarScriptsService,
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
