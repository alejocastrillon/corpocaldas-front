import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';
import { HomeService } from './home.service';
import { RegisterAccessRequestComponent } from './register-access-request/register-access-request.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit {

  cols = [
    { field: 'name', header: 'Nombre' },
    /* { field: 'description', header: 'Descripción' },
    { field: 'entity', header: 'Entidad' },
    { field: 'category', header: 'Categoria' },
    { field: 'license', header: 'Licencia' },
    { field: 'date', header: 'Fecha de Publicación' },
    { field: 'periodicity', header: 'Periodicidad' } */
  ];

  layers: Array<Layer> = [];

  constructor(private router: Router, private service: HomeService, private dialogService: DialogService,
    private confirmService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getLayers();
  }

  public getLayers(): void {
    this.service.getLayers().subscribe(res => {
      this.layers = res;
    }, err => {
      console.error(err);
    });
  }

  public navigateToViewer(data: Layer): void {
    if (data.accessGranted === 1) {
      this.router.navigate(['viewer'], { queryParams: { name: data.name } });
    } else if (data.accessGranted === 2) {
       this.sendRequestAccessLayer(data);
    } else {
      this.haveCredentials(data);
    }
    //this.router.navigate(['viewer'], { queryParams: { name: data.name } });
  }

  private haveCredentials(data: Layer): void {
    this.confirmService.confirm({
      message: `¿Tienes las credenciales para acceder a ${data.name}?`,
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
      },
      reject: () => {
        this.sendRequestAccessLayer(data);
      }
    });
  }

  private sendRequestAccessLayer(data: Layer): void {
    let dialog = this.dialogService.open(RegisterAccessRequestComponent, {
      width: '50%',
      data: {layer: data},
      header: `Petición de acceso a ${data.name}`
    });
    dialog.onClose.subscribe(res => {
      if (res !== null && res !== undefined) {
        this.service.saveAccessRequest(res).subscribe(res => {
          if (data.accessGranted === 2) {
            this.router.navigate(['viewer'], { queryParams: { name: data.name } });
          } else {
            this.messageService.add({severity: 'success', summary: 'Petición de acceso', detail: 'La petición de acceso fue radicada exitosamente, en el transcurso de las 24 horas se le dará acceso'});
          }
        }, err => {
          console.log(err);
        });
      }
    });
  }
}
