import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/screens/auth/guard/AuthGuard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./shared/screens/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'viewer',
    loadChildren: () => import('./shared/screens/viewer/viewer.module').then(m => m.ViewerModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./shared/screens/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
