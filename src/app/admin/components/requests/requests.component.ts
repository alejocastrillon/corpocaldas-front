import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { DetailRequestComponent } from '../detail-request/detail-request.component';
import { AdminService } from '../../services/admin.service';

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
      name: 'Seleccione una opcion',
      code: null
    },
    {
      name: 'Información Corpocaldas',
      code: 1
    },
    {
      name: 'Información de otras entidades',
      code: 2
    }
  ];
  valueAccess: number;
  approved: boolean = null;


  constructor(private service: AdminService, private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  public getFilterAccessRequest(event: LazyLoadEvent, valueAccess: number): void {
    this.loading = true;
    this.eventPage = event;
    this.valueAccess = valueAccess;
    let name: string = event !== null && event.filters.name !== undefined && event.filters.name !== null ? event.filters.name.value : null;
    let email: string = event !== null && event.filters.email !== undefined && event.filters.email != null ? event.filters.email.value : null;
    let layerName: string = event !== null && event.filters.layerName !== undefined && event.filters.layerName !== null ? event.filters.layerName.value : null;
    this.service.filterAccessRequest(name, email, null, layerName, this.valueAccess, event != null ? event.first / event.rows : null, event != null ? event.rows : null).subscribe(res => {
      let data: Array<AccessRequest> = [];
      if (res.data !== null && res.data.length > 0) {
        for (const r of res.data) {
          let access: AccessRequest = new AccessRequest().fromJSON(r);
          data.push(access);
        }
      }
      this.accessRequests = data;
      this.numberOfRows = res.numberRows;
      this.loading = false;
    })
  }

  public openDialog(access: AccessRequest) {
    let dialog = this.dialogService.open(DetailRequestComponent, {
      header: 'Información de solicitud',
      width: '50%',
      data: {
        access: access
      }
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
