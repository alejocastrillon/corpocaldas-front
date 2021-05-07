import { Component, OnInit } from '@angular/core';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { AdminService } from './../../services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  providers: [AdminService]
})
export class RequestsComponent implements OnInit {

  cols = [
    { field: 'email', header: 'Correo electronico' },
    { field: 'nameLayer', header: 'Nombre de la capa' }
  ];
  accessRequests: Array<AccessRequest> = [];
  display = false;
  valueDialog: any;


  constructor(private service: AdminService) { }

  ngOnInit(): void {
    this.getRequestWaitingForApproval();
  }

  getRequestWaitingForApproval() {
    this.service.waitingForApproval().subscribe((success) => {
      this.accessRequests = success;
    }, (error) => {
      console.error(error);
    });
  }

  openDialog(data: any) {
    console.log(data);
    this.valueDialog = data;
    this.display = true;
  }

  accept() {
    console.log('Se ha aceptado');
    this.display = false;
    this.valueDialog = null;
  }

  reject() {
    console.log('No se ha aceptado');
    this.display = false;
    this.valueDialog = null;
  }

}
