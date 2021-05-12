import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';
import { AdminService } from '../../services/admin.service';
import { CreateLayerComponent } from '../create-layer/create-layer.component';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class LayerComponent implements OnInit {

  cols = [
    { field: 'name', header: 'Nombre de la capa' },
    { field: 'url', header: 'URL' },
    { field: 'accessGranted', header: 'Nivel de sensibilidad' }
  ];

  layer: Layer = new Layer();

  layers = Array<Layer>();
  constructor(private service: AdminService, private dialogService: DialogService, private confirmService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getLayers();
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
          this.getLayers();
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
          this.getLayers();
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
          this.getLayers();
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + error.status + ' ' + error.statusText });
        });
      }
    }, error => {
      console.error(error);
    });
  }

  public getLayers(): void {
    this.service.getLayers().subscribe((success: Array<Layer>) => {
      this.layers = success;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + error.status + ' ' + error.statusText });
    });
  }

}
