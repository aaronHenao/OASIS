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
    path: 'reservas',
    loadChildren: () => import('./components/reservas/reservas.module').then(m => m.ReservasModule),
    canActivate: [AuthGuard] // Corregido el typo aquí
  },
  { 
    path: '**', 
    redirectTo: 'inicio' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    enableTracing: false // Activar solo para debugging de rutas
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }