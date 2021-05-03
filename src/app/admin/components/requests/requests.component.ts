import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  providers: [AdminService]
})
export class RequestsComponent implements OnInit {

  cols = [
    { field: 'name', header: 'Nombre' },
    { field: 'mail', header: 'Correo' },
    { field: 'entity', header: 'Entidad' },
    { field: 'layer', header: 'Capa Asociada' },
  ];
  display = false;
  valueDialog: any;
  values: any[] = [];


  constructor(private service: AdminService) { }

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.values.push({
        name: 'Nombre ' + index,
        mail: 'Correo ' + index,
        entity: 'Entidad ' + index,
        layer: 'Capa ' + index,
        observation: 'Observación ' + index
      })
    }
    this.getRequestWaitingForApproval();
  }

  getRequestWaitingForApproval() {
    this.service.waitingForApproval().subscribe((success) => {
      console.log(success);
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
