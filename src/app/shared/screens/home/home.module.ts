import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../../shared.module';
import { HomeComponent } from '../home/home.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RegisterAccessRequestComponent } from './register-access-request/register-access-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterAccessRequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SharedModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    MessagesModule
  ]
})
export class HomeModule { }
