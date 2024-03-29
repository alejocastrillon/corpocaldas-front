import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RegisterAccessRequestComponent } from './register-access-request/register-access-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { VerifyAccessTokenComponent } from './verify-access-token/verify-access-token.component';
import { TermsComponent } from './terms/terms.component';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [
    ViewerComponent,
    RegisterAccessRequestComponent,
    VerifyAccessTokenComponent,
    TermsComponent
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ]
})
export class ViewerModule { }
