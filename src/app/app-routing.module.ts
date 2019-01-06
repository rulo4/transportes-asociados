import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearComponent } from './components/vehiculos/crear/crear.component';
import { EditarComponent } from './components/vehiculos/editar/editar.component';
import { InicioComponent } from './components/vehiculos/inicio/inicio.component';


const routes: Routes = [
  {
    path: 'vehiculos/crear',
    component: CrearComponent
  },
  {
    path: 'vehiculos/editar/:id',
    component: EditarComponent
  },
  {
    path: 'vehiculos',
    component: InicioComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
