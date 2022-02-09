import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';
import { PaginatorDto } from 'src/app/model/PaginatorDto';
import { AdminService } from '../../services/admin.service';
import { CreateLayerComponent } from '../create-layer/create-layer.component';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class LayerComponent implements OnInit {

  optionsFilter: Array<any> = [
    {
      name: "Todas las capas",
      code: null
    },
    {
      name: "Información Corpocaldas",
      code: 1
    },
    {
      name: "Información de otras entidades",
      code: 2
    }
  ];
  optionsVisibleFilter: Array<any> = [
    {
      name: "Todas las capas",
      value: null
    },
    {
      name: "Visible",
      value: true
    },
    {
      name: "No visible",
      value: false
    }
  ]
  valueAccess: number;
  valueVisible: boolean;
  numberOfRows: number;
  eventPage: LazyLoadEvent = null;
  loading: boolean = false;
  layer: Layer = new Layer();

  layers = Array<Layer>();
  constructor(private service: AdminService, private dialogService: DialogService, private confirmService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public createLayer(): void {
    const dialog = this.dialogService.open(CreateLayerComponent, {
      width: '80%',
      header: 'Crear capa',
      data: { layer: this.layer }
    });

    dialog.onClose.subscribe(response => {
      if (response !== null && response !== undefined) {
        this.service.saveLayer(response).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Capas', detail: 'La capa ha sido creada exitosamente' });
          this.getLayers(this.eventPage, this.valueAccess, this.valueVisible);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error : ' + error.status + error.message });
        });
      }
    }, error => {
      console.error(error);
    });
  }

  public deleteLayer(layer: Layer): void {
    this.confirmService.confirm({
      message: `Esta acción eliminará los registros de descarga asociados a esta capa. <br>¿Deseas realmente eliminar la capa ${layer.name}?`,
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.service.deleteLayer(layer.id).subscribe(success => {
          this.messageService.add({ severity: 'success', summary: 'Capas', detail: 'La capa ha sido eliminada exitosamente' });
          this.getLayers(this.eventPage, this.valueAccess, this.valueVisible);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + error.status + ' ' + error.statusText });
        });
      }
    });
  }

  public editLayer(layer: Layer): void {
    console.log(layer);
    const dialog = this.dialogService.open(CreateLayerComponent, {
      width: '80%',
      header: 'Editar capa',
      data: { layer }
    });

    dialog.onClose.subscribe(response => {
      if (response !== null && response !== undefined) {
        this.service.editLayer(response).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Capas', detail: 'La capa ha sido modificada exitosamente' });
          this.getLayers(this.eventPage, this.valueAccess, this.valueVisible);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + error.status + ' ' + error.statusText });
        });
      }
    }, error => {
      console.error(error);
    });
  }

  public getLayers(event: LazyLoadEvent, valueAccess: number, valueVisible: boolean): void {
    this.loading = true;
    this.eventPage = event;
    this.valueAccess = valueAccess;
    this.valueVisible = valueVisible;
    let name: string = event !== null && event.filters.name !== null && event.filters.name !== undefined ? event.filters.name.value : null;
    this.service.getLayers(name, this.valueAccess, this.valueVisible, event !== null ? event.first / event.rows : null, event !== null ? event.rows : null).subscribe((success: PaginatorDto) => {
      let data:Array<Layer> = [];
      if (success.data !== null && success.data.length > 0) {
        for (const r of success.data) {
          let layer: Layer = new Layer().fromJSON(r);
          data.push(layer);
        }
      }
      this.layers = data;
      this.numberOfRows = success.numberRows;
      this.loading = false;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + error.status + ' ' + error.statusText });
    });
  }

  public exportExcel(event: LazyLoadEvent, valueAccess: number, valueVisible: boolean): void {
    this.loading = true;
    this.eventPage = event;
    this.valueAccess = valueAccess;
    this.valueVisible = valueVisible;
    let name: string = event !== null && event.filters.name !== undefined && event.filters.name !== null ? event.filters.name.value : null;
    this.service.exportLayers('excel', name, this.valueAccess, this.valueVisible).subscribe((response: HttpResponse<Blob>) => {
      let filename: string = "capas.xlsx";
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

  public exportPdf(event: LazyLoadEvent, valueAccess: number, valueVisible: boolean): void {
    this.loading = true;
    this.eventPage = event;
    this.valueAccess = valueAccess;
    this.valueVisible = valueVisible;
    let name: string = event !== null && event.filters.name !== undefined && event.filters.name !== null ? event.filters.name.value : null;
    this.service.exportLayers('pdf', name, this.valueAccess, this.valueVisible).subscribe((response: HttpResponse<Blob>) => {
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
}
