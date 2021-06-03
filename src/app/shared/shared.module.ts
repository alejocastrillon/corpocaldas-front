import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { GuideComponent } from './components/guide/guide.component';



@NgModule({
  declarations: [
    HeaderComponent,
    GuideComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
