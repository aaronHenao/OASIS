import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'inicio', 
    pathMatch: 'full' 
  },
  { 
    path: 'inicio', 
    loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule),
    data: { hideHeader: true }
  },
  { 
    path: 'registro', 
    loadChildren: () => import('./components/registro/registro.module').then(m => m.RegistroModule) 
  },
  { 
    path: 'perfil', 
    loadChildren: () => import('./components/perfil/perfil.module').then(m => m.PerfilModule),
    canActivate: [AuthGuard] 
  },
  { 
    path: '**', 
    redirectTo: 'inicio' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }