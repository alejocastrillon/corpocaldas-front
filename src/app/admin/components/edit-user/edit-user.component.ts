import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  formUser: FormGroup;
  user: User = new User();

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.user = config.data.user;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formUser = this.fb.group({
      id: [this.user.id],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      enabled: [this.user.enabled, Validators.compose([Validators.required])],
      lastname: [this.user.lastname, Validators.compose([Validators.required])],
      name: [this.user.name, Validators.compose([Validators.required])],
      password: [this.user.password, Validators.compose([Validators.required])],
      role: [this.user.role, Validators.compose([Validators.required])],
      username: [this.user.username, Validators.compose([Validators.required])]
    });
  }

  public cancel(): void {
    this.ref.close(null);
  }

  public saveUser(): void {
    this.ref.close(this.formUser.value);
  }

}
