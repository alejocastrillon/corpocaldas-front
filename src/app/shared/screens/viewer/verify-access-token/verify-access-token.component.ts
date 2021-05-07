import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-verify-access-token',
  templateUrl: './verify-access-token.component.html',
  styleUrls: ['./verify-access-token.component.scss']
})
export class VerifyAccessTokenComponent implements OnInit {

  email: string;
  token: string;
  verifyForm: FormGroup;
  layerId: number;

  constructor(private formBuilder: FormBuilder, private config: DynamicDialogConfig, private ref: DynamicDialogRef) { 
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

  public cancel(): void {
    this.ref.close();
  }
}
