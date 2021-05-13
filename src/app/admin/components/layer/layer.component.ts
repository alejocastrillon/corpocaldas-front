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
      name: "Publico",
      code: 1
    },
    {
      name: "Privado",
      code: 2
    }
  ];
  value: number;
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
      width: '450px',
      header: 'Crear capa',
      data: { layer: this.layer }
    });

    dialog.onClose.subscribe(response => {
      if (response !== null && response !== undefined) {
        this.service.saveLayer(response).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Capas', detail: 'La capa ha sido creada exitosamente' });
          this.getLayers(this.eventPage, this.value);
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
      message: `¿Deseas realmente eliminar la capa ${layer.name}?`,
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.service.deleteLayer(layer.id).subscribe(success => {
          if (success) {
            this.messageService.add({ severity: 'success', summary: 'Capas', detail: 'La capa ha sido eliminada exitosamente' });
          } else {
            this.messageService.add({ severity: 'warning', summary: 'Capas', detail: 'La capa no ha sido eliminada exitosamente' });
          }
          this.getLayers(this.eventPage, this.value);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + error.status + ' ' + error.statusText });
        });
      }
    });
  }

  public editLayer(layer: Layer): void {
    console.log(layer);
    const dialog = this.dialogService.open(CreateLayerComponent, {
      width: '450px',
      header: 'Editar capa',
      data: { layer }
    });

    dialog.onClose.subscribe(response => {
      if (response !== null) {
        this.service.editLayer(response).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Capas', detail: 'La capa ha sido modificada exitosamente' });
          this.getLayers(this.eventPage, this.value);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + error.status + ' ' + error.statusText });
        });
      }
    }, error => {
      console.error(error);
    });
  }

  public getLayers(event: LazyLoadEvent, value: number): void {
    debugger;
    this.loading = true;
    this.value = value;
    let name: string = event !== null && event.filters.name !== null && event.filters.name !== undefined ? event.filters.name.value : null;
    this.service.getLayers(name, this.value, event !== null ? event.first / event.rows : null, event !== null ? event.rows : null).subscribe((success: PaginatorDto) => {
      let data:Array<Layer> = [];
      if (success.data !== null && success.data.length > 0) {
        for (const r of success.data) {
          let layer: Layer = new Layer().fromJSON(r);
          data.push(layer);
        }
      }
      this.layers = data;
      debugger;
      this.numberOfRows = success.numberRows;
      this.loading = false;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + error.status + ' ' + error.statusText });
    });
  }

}
