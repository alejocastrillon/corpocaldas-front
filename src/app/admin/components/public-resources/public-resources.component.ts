import { Component, OnInit } from '@angular/core';
import { Layer } from 'src/app/model/Layer';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-public-resources',
  templateUrl: './public-resources.component.html',
  styleUrls: ['./public-resources.component.scss']
})
export class PublicResourcesComponent implements OnInit {

  layers: Array<Layer> = [];

  constructor(private service: AdminService) { }

  ngOnInit(): void {
    this.getLayers();
  }

  private getLayers(): void {
    this.service.getLayers().subscribe(res => {
      this.layers = res;
    }, err => {
      console.error(err);
    });
  }
}
