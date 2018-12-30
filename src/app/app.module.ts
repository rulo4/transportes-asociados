import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearComponent } from './components/vehiculos/crear/crear.component';
import { EditarComponent } from './components/vehiculos/editar/editar.component';
import { InicioComponent } from './components/vehiculos/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearComponent,
    EditarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
