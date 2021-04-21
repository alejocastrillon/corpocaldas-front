import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cols = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripción' },
    { field: 'entity', header: 'Entidad' },
    { field: 'category', header: 'Categoria' },
    { field: 'license', header: 'Licencia' },
    { field: 'date', header: 'Fecha de Publicación' },
    { field: 'periodicity', header: 'Periodicidad' }
  ];

  values: any[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      this.values.push({
        name: 'Nombre ' + index,
        description: 'Descripción ' + index,
        entity: 'Entidad ' + index,
        category: 'Categoria ' + index,
        license: 'Licencia ' + index,
        date: 'Fecha ' + index,
        periodicity: 'Periodicidad ' + index
      })
    }
  }

}
