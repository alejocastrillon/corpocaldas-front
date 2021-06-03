import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { FileUploadModule } from 'primeng/fileupload';
import { DetailRequestComponent } from './components/detail-request/detail-request.component';
import { LayerComponent } from './components/layer/layer.component';
import { CreateLayerComponent } from './components/create-layer/create-layer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { CreateWorkspaceComponent } from './components/create-workspace/create-workspace.component';
import { SelectWorkspaceComponent } from './components/select-workspace/select-workspace.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    DashboardComponent,
    RequestsComponent,
    DetailRequestComponent,
    LayerComponent,
    CreateLayerComponent,
    WorkspaceComponent,
    CreateWorkspaceComponent,
    SelectWorkspaceComponent,
    UsersComponent,
    EditUserComponent
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
    HttpClientModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    FileUploadModule,
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
