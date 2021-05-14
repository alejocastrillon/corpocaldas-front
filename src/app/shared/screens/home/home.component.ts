import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
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
  valueAccess: number;
  eventPage: LazyLoadEvent = null;
  numberOfRows: number;
  loading: boolean = false;
  layers: Array<Layer> = [];

  constructor(private router: Router, private service: HomeService, private dialogService: DialogService,
    private confirmService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public getLayers(event: LazyLoadEvent, valueAccess: number): void {
    this.eventPage = event;
    this.loading = true;
    this.valueAccess = valueAccess;
    let name: string = event !== null && event.filters.name !== null && event.filters.name !== undefined ? event.filters.name.value : null;
    this.service.getLayers(name, this.valueAccess, true,  event !== null ? event.first / event.rows : null, event !== null ? event.rows : null).subscribe(res => {
      let data: Array<Layer> = [];
      if (res.data !== null && res.data.length > 0) {
        for (const r of res.data) {
          let layer: Layer = new Layer().fromJSON(r);
          data.push(layer);
        }
      }
      this.layers = data;
      this.numberOfRows = res.numberRows;
      this.loading = false;
    }, err => {
      console.error(err);
    });
  }

  public navigateToViewer(data: Layer): void {
      this.router.navigate(['viewer'], { queryParams: { name: data.name } });
  }

}
