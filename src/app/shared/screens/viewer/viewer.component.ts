import { Component, OnInit } from '@angular/core';

declare let L;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let mymap = L.map('mapid').setView([4.75136, -75.907072], 12);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '...'
    }).addTo(mymap);
  }

}
