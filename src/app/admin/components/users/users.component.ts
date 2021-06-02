import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/model/User';
import { AdminService } from '../../services/admin.service';
import { UsersService } from '../../services/users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class UsersComponent implements OnInit {

  users: Array<any> = [];
  optionsFilter: Array<any> = [
    {
      name: 'Todos los usuarios',
      code: null
    },
    {
      name: 'Activos',
      code: true
    },
    {
      name: 'Inactivos',
      code: false
    }
  ];
  valueEnabled: boolean;
  numberOfRows: number;
  eventPage: LazyLoadEvent = null;
  loading: boolean = false;

  constructor(private confirmService: ConfirmationService, private messageService: MessageService, private service: AdminService, private dialogService: DialogService) { }

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
        this.service.saveUser(response).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Usuarios', detail: 'El usuario ha sido creado exitosamente' });
          this.getUsers(this.eventPage, this.valueEnabled);
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
        this.service.updateUser(response.id, response).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Usuarios', detail: 'El usuario ha sido modificado exitosamente' });
          this.getUsers(this.eventPage, this.valueEnabled);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Usuarios', detail: 'Error : ' + error.status + error.message });
        });
      }
    }, error => {
      console.error(error);
    })
  }

  deleteUser(user): void { }

  getUsers(event: LazyLoadEvent, valueEnabled: boolean): void {
    this.loading = true;
    this.valueEnabled = valueEnabled;
    let name: string = event !== null && event.filters.name !== null && event.filters.name !== undefined ? event.filters.name.value : null;
    let lastname: string = event !== null && event.filters.lastname !== null && event.filters.lastname !== undefined ? event.filters.lastname.value : null;
    let email: string = event !== null && event.filters.email !== null && event.filters.email !== undefined ? event.filters.email.value : null;

    this.service.getUsers(name, lastname, email, this.valueEnabled, event !== null ? event.first / event.rows : null, event !== null ? event.rows : null).subscribe((response) => {
      let data: Array<User> = [];
      if (response.data !== null && response.data.length > 0) {
        for (const r of response.data) {
          let user: User = new User().fromJSON(r);
          data.push(user);
        }
      }
      this.users = data;
      this.numberOfRows = response.numberRows;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }

}

