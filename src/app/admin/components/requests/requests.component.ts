import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
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
  numberOfRows: number;
  eventPage: LazyLoadEvent = null;
  loading: boolean = false;
  display = false;
  valueDialog: any;
  optionsFilter: Array<any> = [
    {
      name: 'No aplica aprobación',
      code: 1
    },
    {
      name: 'Aprobadas',
      code: 2
    },
    {
      name: 'Desaprobadas',
      code: 3
    },
    {
      name: 'Pendientes',
      code: 4
    }
  ];
  optionFilterSelected: number = 1;
  accessGranted: number = 2;
  approved: boolean = null;


  constructor(private service: AdminService) { }

  ngOnInit(): void {
  }

  changeFilter(): void {
    if (this.optionFilterSelected === 1) {
      this.accessGranted = 2;
      this.approved = null;
    } else if (this.optionFilterSelected >= 2) {
      this.accessGranted = 3;
      if (this.optionFilterSelected === 2) {
        this.approved = true;
      } else if (this.optionFilterSelected === 3) {
        this.approved = false;
      } else {
        this.approved = null;
      }
    }
    this.getFilterAccessRequest(null);
  }

  public getFilterAccessRequest(event: LazyLoadEvent): void {
    debugger;
    this.loading = true;
    this.eventPage = event;
    let name: string = event.filters.name !== undefined ? event.filters.name.value : null;
    let email: string = event.filters.email !== undefined ? event.filters.email.value : null;
    this.service.filterAccessRequest(name, email, null, null, this.accessGranted, this.approved, event != null ? event.first / event.rows : null, event != null ? event.rows : null).subscribe(res => {
      this.accessRequests = res.data;
      this.numberOfRows = res.numberRows;
      this.loading = false;
    })
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
