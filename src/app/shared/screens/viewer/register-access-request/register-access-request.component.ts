import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccessRequest } from 'src/app/model/AccessRequest';

@Component({
  selector: 'app-register-access-request',
  templateUrl: './register-access-request.component.html',
  styleUrls: ['./register-access-request.component.scss']
})
export class RegisterAccessRequestComponent implements OnInit {

  accessRequestForm: FormGroup;
  accessRequest: AccessRequest = new AccessRequest();

  constructor(private formBuilder: FormBuilder, private config: DynamicDialogConfig, private ref: DynamicDialogRef) {
    this.accessRequest.idLayer = this.config.data.layer.id;
    this.accessRequest.nameLayer = this.config.data.layer.name;
    this.validateForm();
  }

  ngOnInit(): void {
    this.validateForm();
  }

  private validateForm(): void {
    this.accessRequestForm = this.formBuilder.group({
      'email': [this.accessRequest.email, [Validators.required, Validators.email]],
      'description': [this.accessRequest.description, [Validators.required]]
    });
  }

  public saveAccessRequest(): void {
    console.log(this.accessRequest);
    this.ref.close(this.accessRequest);
  }

  public cancel(): void {
    this.ref.close(null);
  }

}
