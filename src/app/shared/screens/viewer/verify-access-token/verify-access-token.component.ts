import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-verify-access-token',
  templateUrl: './verify-access-token.component.html',
  styleUrls: ['./verify-access-token.component.scss'],
  providers: [MessageService]
})
export class VerifyAccessTokenComponent implements OnInit {

  email: string;
  token: string;
  verifyForm: FormGroup;
  layerId: number;

  constructor(private formBuilder: FormBuilder, private config: DynamicDialogConfig, private ref: DynamicDialogRef,
    private service: HomeService, private messageService: MessageService) { 
    this.layerId = this.config.data.layerId;
  }

  ngOnInit(): void {
    this.validateForm();
  }

  private validateForm(): void {
    this.verifyForm = this.formBuilder.group({
      'email': [this.email, [Validators.required, Validators.email]],
      'token': [this.token, [Validators.required]]
    });
  }

  public verifyAccess(): void {
    this.service.verifyAccess(this.token, this.email, this.layerId).subscribe(res => {
      this.ref.close(res);
    }, err => {
      this.messageService.add({severity: 'error', summary: 'Verificación de token', detail: 'Token invalido'});
      console.error(err);
    })
  }

  public cancel(): void {
    this.ref.close();
  }
}
