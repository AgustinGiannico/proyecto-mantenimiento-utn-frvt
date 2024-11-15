import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../app/auth/auth.guard';

import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { LaunchpadComponent } from './pages/launchpad/launchpad.component';
import { GestionOrdenesComponent } from './pages/gestion-ordenes/gestion-ordenes.component';
import { GestionInfraestructuraComponent } from './pages/gestion-infraestructura/gestion-infraestructura.component';
import { GestionOperariosComponent } from './pages/gestion-operarios/gestion-operarios.component';
import { EdificeComponent } from './components/edifice/edifice.component';
import { FloorComponent } from './components/floor/floor.component';
import { SectorComponent } from './components/sector/sector.component';
import { SiteComponent } from './components/site/site.component';
import { AssetTypeComponent } from './components/asset-type/asset-type.component';
import { TagComponent } from './components/tag/tag.component';
import { TaskComponent } from './components/task/task.component';
import { TaskTypeComponent } from './components/task-type/task-type.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { OtComponent } from './components/ot/ot.component';
import { CrearOrdenComponent } from './components/crear-orden/crear-orden.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },



  {
    path: '',
    component: LaunchpadComponent, canActivate: [authGuard]
  },

  {
    path: 'registro',
    component: RegistroComponent, canActivate: [authGuard]
  },

  {
    path: 'logout',
    component: LogoutComponent, canActivate: [authGuard]
  },
  {
    path: 'gestion-ordenes',
    component: GestionOrdenesComponent , canActivate: [authGuard]
  },
  {
    path: 'gestion-infraestructura',
    component: GestionInfraestructuraComponent , canActivate: [authGuard]
  },
  {
    path: 'gestion-operarios',
    component: GestionOperariosComponent, canActivate: [authGuard]
  },
  {
    path: 'edificio',
    component: EdificeComponent , canActivate: [authGuard]
  },
  {
    path: 'piso',
    component: FloorComponent, canActivate: [authGuard]
  },
  {
    path: 'sector',
    component: SectorComponent, canActivate: [authGuard]
  },
  {
    path: 'ubicacion',
    component: SiteComponent, canActivate: [authGuard]
  },
  {
    path: 'tipo-activo',
    component: AssetTypeComponent, canActivate: [authGuard]
  },
  {
    path: 'tag',
    component: TagComponent, canActivate: [authGuard]
  },
  {
    path: 'task',
    component: TaskComponent, canActivate: [authGuard]
  },
  {
    path: 'task-type',
    component: TaskTypeComponent, canActivate: [authGuard]
  },
  {
    path: 'task-list',
    component: TaskListComponent, canActivate: [authGuard]
  },
  {
    path: 'ver-ordenes',
    component: OtComponent, canActivate: [authGuard]
  },
  {
    path: 'crear-orden',
    component: CrearOrdenComponent, canActivate: [authGuard]
  },

  {
    path: '**', component: NotFoundComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
