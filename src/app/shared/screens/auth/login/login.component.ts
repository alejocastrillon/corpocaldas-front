import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.login(username, password).subscribe((response) => {
        this.messageService.clear();
        sessionStorage.setItem('ACCESS_TOKEN', response.token);
        sessionStorage.setItem('ACCESS_USER', response.userId);
        sessionStorage.setItem('ACCESS_ROLE', response.userRole);
        this.isLoading = false;
        this.route.navigate(['/admin']);
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Login', detail: 'Nombre de usuario o contraseña erroneos'});
      });
    }
  }

}
