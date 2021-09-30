import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { DetailRequestComponent } from '../detail-request/detail-request.component';
import { AdminService } from '../../services/admin.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';

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

  getFileName(response: HttpResponse<Blob>) {
    let filename: string;
    try {
      const contentDisposition: string = response.headers.get('content-disposition');
      const r = /(?:filename=")(.+)(?:;")/
      filename = r.exec(contentDisposition)[1];
    }
    catch (e) {
      filename = 'myfile.txt'
    }
    return filename
  }

  public exportExcel(event: LazyLoadEvent, valueAccess: number): void {
    this.loading = true;
    this.eventPage = event;
    this.valueAccess = valueAccess;
    let name: string = event !== null && event.filters.name !== undefined && event.filters.name !== null ? event.filters.name.value : null;
    let email: string = event !== null && event.filters.email !== undefined && event.filters.email != null ? event.filters.email.value : null;
    let layerName: string = event !== null && event.filters.layerName !== undefined && event.filters.layerName !== null ? event.filters.layerName.value : null;
    this.service.exportAccessRequest('excel', name, email, null, layerName, this.valueAccess).subscribe((response: HttpResponse<Blob>) => {
      let filename: string = "accesos.xlsx";
      let binaryData = [];
      binaryData.push(response.body);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
      downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      this.loading = false;
    });
  }

  public exportPdf(event: LazyLoadEvent, valueAccess: number): void {
    this.loading = true;
    this.eventPage = event;
    this.valueAccess = valueAccess;
    let name: string = event !== null && event.filters.name !== undefined && event.filters.name !== null ? event.filters.name.value : null;
    let email: string = event !== null && event.filters.email !== undefined && event.filters.email != null ? event.filters.email.value : null;
    let layerName: string = event !== null && event.filters.layerName !== undefined && event.filters.layerName !== null ? event.filters.layerName.value : null;
    this.service.exportAccessRequest('pdf', name, email, null, layerName, this.valueAccess).subscribe((response: HttpResponse<Blob>) => {
      let filename: string = "accesos.pdf";
      let binaryData = [];
      binaryData.push(response.body);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
      downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      this.loading = false;
    });
  }

  /**
     * Method is use to download file.
     * @param data - Array Buffer data
     * @param type - type of the document.
     */
  downLoadFile(data: any, type: string) {
    debugger
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
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
