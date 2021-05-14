import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { DetailRequestComponent } from '../detail-request/detail-request.component';
import { AdminService } from './../../services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  providers: [AdminService, DialogService, MessageService]
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
  accessGranted: number = 1;
  approved: boolean = null;


  constructor(private service: AdminService, private dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  changeFilter(): void {
    if (this.optionFilterSelected === 1) {
      this.accessGranted = 1;
      this.approved = null;
    } else if (this.optionFilterSelected >= 2) {
      this.accessGranted = 2;
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
    this.loading = true;
    this.eventPage = event;
    let name: string = event !== null && event.filters.name !== undefined && event.filters.name !== null ? event.filters.name.value : null;
    let email: string = event !== null && event.filters.email !== undefined && event.filters.email != null ? event.filters.email.value : null;
    this.service.filterAccessRequest(name, email, null, null, this.accessGranted, this.approved, event != null ? event.first / event.rows : null, event != null ? event.rows : null).subscribe(res => {
      this.accessRequests = res.data;
      this.numberOfRows = res.numberRows;
      this.loading = false;
    })
  }

  public openDialog(access: AccessRequest) {
    let dialog = this.dialogService.open(DetailRequestComponent, {
      header: this.optionFilterSelected === 4 ? 'Aprobar solicitud' : 'Información de solicitud',
      width: '50%',
      data: {
        access: access,
        optionFilterSelected: this.optionFilterSelected
      }
    });
    dialog.onClose.subscribe(res => {
      if (res !== null && res !== undefined) {
        this.messageService.add({severity: 'success', detail: `La solicitud ha sido ${res.approved ? 'aceptada' : 'rechazada'} satisfactoriamente`, summary: 'Verificación de solicitudes'});
      }
      this.getFilterAccessRequest(this.eventPage);
    });
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
