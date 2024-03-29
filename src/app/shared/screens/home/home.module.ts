import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../../shared.module';
import { HomeComponent } from '../home/home.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MetadataComponent } from './metadata/metadata.component';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [
    HomeComponent,
    MetadataComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProgressBarModule,
    ButtonModule,
    SharedModule,
    TableModule,
    DropdownModule,
    TreeTableModule,
    MessagesModule,
    MessageModule,
    ToastModule
  ]
})
export class HomeModule { }
