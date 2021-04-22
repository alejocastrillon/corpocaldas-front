import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

declare let L;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  name: string;
  map: any;

  constructor(router: ActivatedRoute) {
    router.queryParams.subscribe(params => {
      this.name = params["name"];
      console.log(this.name);
    });
  }

  ngOnInit(): void {
    this.map = L.map('mapid').setView([4.75136, -75.907072], 12);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '...'
    }).addTo(this.map);
  }

}
