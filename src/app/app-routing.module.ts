import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
