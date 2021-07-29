import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { DetailRequestComponent } from '../detail-request/detail-request.component';
import { AdminService } from '../../services/admin.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';

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

  public exportPdf(): void {
    let doc = new jsPDF();
    autoTable(doc, {
      head: [['Id', 'Email', 'Nombre', 'Empresa', 'Descripción', 'Nombre de capa', 'Fecha de Realización']],
      body: this.buildPdfData()
    });
    doc.save('accesos.pdf');
  }

  private buildPdfData(): Array<Array<string>> {
    let data: Array<any> = [];
    for (const dato of this.accessRequests) {
      let value: Array<string> = [];
      value.push(dato.id.toString());
      value.push(dato.email);
      value.push(dato.name);
      value.push(dato.company);
      value.push(dato.description);
      value.push(dato.nameLayer);
      value.push(dato.realizationDate.toString());
      data.push(value);
    }
    return data;
  }

  public exportExcel(): void {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.accessRequests);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "accesos");
    });
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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
    this.dialogService.open(DetailRequestComponent, {
      header: 'Información de solicitud',
      width: '50%',
      data: {
        access: access
      }
    });
  }

}
