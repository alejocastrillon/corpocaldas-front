import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

declare let L;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  layersControl: any;
  map: any;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
    this.addControls();
  }

  public addControls(): void {
    this.addLogoControl();
    this.addScaleControl();
    this.addSearchControl();
    this.addZoomControl();
  }

  /**
   * Añade logo al mapa
   */
  public addLogoControl(): void {
    const logo = L.control({ position: 'topright' });
    logo.onAdd = () => {
      const div = L.DomUtil.create('div', 'info');
      div.innerHTML = `<img src="assets/images/SIR.bmp" width="188px" height="70px"></img>`;
      return div;
    };
    logo.addTo(this.map);
  }

  /**
   * Añade control de Escala al mapa.
   */
  public addScaleControl(): void {
    const scaleControl = L.control.scale({ position: 'bottomleft' });
    this.map.addControl(scaleControl);
  }

  /**
   * Añade control de Búsqueda al mapa
   */
  public addSearchControl(): void {
    const searchControl = L.esri.Geocoding.geosearch({ position: 'topright', placeholder: 'Buscar lugares o direcciones' }).addTo(this.map);

    const results = L.layerGroup().addTo(this.map);

    searchControl.on('results', (data) => {
      results.clearLayers();
      console.log(data);
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[0].latlng));
      }
    });
  }

  /**
   * Añade control de Zoom al mapa
   */
  public addZoomControl(): void {
    const zoomControl = L.control.zoom({ position: 'topright' });
    this.map.addControl(zoomControl);
  }

  /**
   * Determina cual llave de las propiedades es el clasificador de una capa determinada.
   * @param properties Propiedades del feature
   * @param nameLayer Nombre de la capa
   */
  public getColorProperty(properties: any, nameLayer: string): string {
    let value: string;
    if (nameLayer === 'Risaralda') {
      value = properties.Subcategor;
    } else if (nameLayer === 'Paisaje Cultural Cafetero') {
      value = properties.ZONA;
    } else {
      value = properties.NOMJERARQ;
    }
    return value;
  }

  /**
   * Resalta un feature de una capa determinada cuando el mouse esté sobre él.
   * @param e Información del feature
   */
  private highlightFeature(e): void {
    const layer = e.target;
    layer.setStyle({
      weight: 5,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042',
    });
  }

  /**
   * Datos del feature para ser mostrados en los popups.
   * @param properties Propiedades del feature
   */
  public infoFeature(properties: any): string {
    let dataFeature = '';
    // tslint:disable-next-line:forin
    for (const key in properties) {
      dataFeature += `<b>${key}:</b> ${properties[key]} <br>`;
    }
    return dataFeature;
  }

  private initializeMap(): void {
    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const esriMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    const baselayers = {
      'Open Street Map': openStreetMap,
      'Esri Map': esriMap
    };

    this.map = L.map('map', {
      center: L.latLng(4.80045, -75.65844),
      zoomControl: false,
      zoom: 12,
      layers: [openStreetMap]
    });

    this.layersControl = L.control.layers(baselayers, null, { position: 'topleft', collapsed: false });
    this.layersControl.addTo(this.map);
  }

  /**
   * Renderiza la capa en el mapa.
   * @param infoLayer Información de la capa
   * @param name Nombre de la capa
   * @param categories Categorias asociadas a la capa
   */
  private loadLayer(infoLayer: any, name: string, categories: any): void {
    const layer = L.geoJSON(infoLayer, {
      pointToLayer: (feature, latlng) => {
        return new L.CircleMarker(latlng, {
          radius: 5,
        });
      },
      style: (feature) => {
        return {
          weight: 3,
          opacity: 0.5,
          color: name !== 'Veredas' ? categories[this.getColorProperty(feature.properties, name)] : 'black',
          fillOpacity: 0.8,
          fillColor: name !== 'Veredas' ? categories[this.getColorProperty(feature.properties, name)] : 'transparent'
        };
      },
      onEachFeature: (_, layer) => (
        name === 'Veredas' ? layer.bindTooltip(String(_.properties.NOMBRE), { opacity: 0.7 }) : null,
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e, name, categories)),
        })
      )
    }).bindPopup((layer: any) => {
      return this.infoFeature(layer.feature.properties);
    });
    this.layersControl.addOverlay(layer, name);
    name !== 'Bocatomas' && name !== 'Veredas' ? layer.remove() : null;
  }

  /**
   * Limpia la animación cuando el feature haya sido dejado por el mouse.
   * @param e Información del feature
   */
  private resetFeature(e: any, name: string, categories: any): void {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: name !== 'Veredas' ? categories[this.getColorProperty(layer.feature.properties, name)] : 'black',
      fillOpacity: 0.8,
      fillColor: name !== 'Veredas' ? categories[this.getColorProperty(layer.feature.properties, name)] : 'transparent'
    });
  }

}
