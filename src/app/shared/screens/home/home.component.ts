import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';
import { HomeService } from './home.service';

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
      this.router.navigate(['viewer'], { queryParams: { name: data.name } });
  }

}
