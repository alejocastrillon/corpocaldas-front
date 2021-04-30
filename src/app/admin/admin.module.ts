import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';

import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { RequestsComponent } from './components/requests/requests.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatSidenavModule,
    PanelMenuModule,
    CardModule,
    TableModule,
    ButtonModule,
    DialogModule
  ]
})
export class AdminModule { }
