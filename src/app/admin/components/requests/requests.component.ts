import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  cols = [
    { field: 'name', header: 'Nombre' },
    { field: 'mail', header: 'Correo' },
    { field: 'entity', header: 'Entidad' },
    { field: 'layer', header: 'Capa Asociada' },
  ];
  display = false;
  valueDialog: any;
  values: any[] = [];


  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.values.push({
        name: 'Nombre ' + index,
        mail: 'Correo ' + index,
        entity: 'Entidad ' + index,
        layer: 'Capa ' + index,
        observation: 'Observación ' + index
      })
    }
  }

  openDialog(data: any) {
    console.log(data);
    this.valueDialog = data;
    this.display = true;
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
