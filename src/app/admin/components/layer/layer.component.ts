import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';
import { AdminService } from '../../services/admin.service';
import { CreateLayerComponent } from '../create-layer/create-layer.component';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class LayerComponent implements OnInit {

  cols = [
    { field: 'name', header: 'Nombre de la capa' },
    { field: 'url', header: 'URL' },
    { field: 'accessGranted', header: 'Nivel de sensibilidad' }
  ];

  layer: Layer = new Layer();

  layers = Array<Layer>();
  constructor(private service: AdminService, private dialogService: DialogService, private confirmService: ConfirmationService) { }

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
        this.service.saveLayer(response).subscribe(success => {
          console.log(success);
          this.getLayers();
        }, error => {
          console.error(error);
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
          console.log(success);
          this.getLayers();
        }, error => {
          console.error(error);
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
        this.service.editLayer(response).subscribe(success => {
          console.log(success);
          this.getLayers();
        }, error => {
          console.error(error);
        });
      }
    }, error => {
      console.error(error);
    });
  }

  public getLayers(): void {
    this.service.getLayers().subscribe(success => {
      this.layers = success;
    }, error => {
      console.error(error);
    });
  }

}
