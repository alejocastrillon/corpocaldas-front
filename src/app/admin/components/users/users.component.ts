import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/model/User';
import { UsersService } from '../../services/users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class UsersComponent implements OnInit {
  cols = cols;

  users: Array<any> = [];

  constructor(private confirmService: ConfirmationService, private messageService: MessageService, private userService: UsersService, private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  createUser(): void {
    const user = new User();
    this.dialogService.open(EditUserComponent, {
      header: 'Crear Usuario',
      width: '80%',
      data: { user }
    }).onClose.subscribe(response => {
      if (response !== null && response !== undefined) {
        this.userService.saveUser(response).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Usuarios', detail: 'El usuario ha sido creado exitosamente' });
          this.getUsers();
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Usuarios', detail: 'Error : ' + error.status + error.message });
        });
      }
    }, error => {
      console.error(error);
    });
  }

  updateUser(user): void {
    this.dialogService.open(EditUserComponent, {
      header: 'Editar Usuario',
      width: '80%',
      data: { user }
    }).onClose.subscribe(response => {
      if (response !== null && response !== undefined) {
        this.userService.updateUser(response.id, response).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Usuarios', detail: 'El usuario ha sido modificado exitosamente' });
          this.getUsers();
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Usuarios', detail: 'Error : ' + error.status + error.message });
        });
      }
    }, error => {
      console.error(error);
    })
  }

  deleteUser(user): void { }

  getUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }

}

const cols = [
  { field: 'name', header: 'Nombre' },
  { field: 'lastname', header: 'Apellido' },
  { field: 'email', header: 'Correo' },
  { field: 'username', header: 'Usuario' },
  { field: 'role', header: 'Rol' },
  { field: 'enabled', header: 'Habilitado' }
]
