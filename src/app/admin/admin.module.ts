import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TreeTableModule } from 'primeng/treetable';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DetailRequestComponent } from './components/detail-request/detail-request.component';
import { LayerComponent } from './components/layer/layer.component';
import { CreateLayerComponent } from './components/create-layer/create-layer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { CreateWorkspaceComponent } from './components/create-workspace/create-workspace.component';
import { SelectWorkspaceComponent } from './components/select-workspace/select-workspace.component';

@NgModule({
  declarations: [
    DashboardComponent,
    RequestsComponent,
    DetailRequestComponent,
    LayerComponent,
    CreateLayerComponent,
    WorkspaceComponent,
    CreateWorkspaceComponent,
    SelectWorkspaceComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    PanelMenuModule,
    CardModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    TreeTableModule,
    MessagesModule,
    HttpClientModule,
    DynamicDialogModule,
    ToggleButtonModule
  ]
})
export class AdminModule { }
