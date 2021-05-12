import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from './components/requests/requests.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LayerComponent } from './components/layer/layer.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'requests', component: RequestsComponent },
      { path: 'layer', component: LayerComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
