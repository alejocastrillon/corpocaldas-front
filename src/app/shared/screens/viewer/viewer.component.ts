import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';
import { HomeService } from '../home/home.service';
import { RegisterAccessRequestComponent } from './register-access-request/register-access-request.component';
import { TermsComponent } from './terms/terms.component';
import { VerifyAccessTokenComponent } from './verify-access-token/verify-access-token.component';
import { environment } from "../../../../environments/environment";

declare let L;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class ViewerComponent implements OnInit {

  layersControl: any;
  layer: Layer;
  map: any;
  name: string;
  readonly geoServer: string = environment.geoServer;

  constructor(private route: ActivatedRoute, private service: HomeService, private confirmService: ConfirmationService,
    private messageService: MessageService, private dialogService: DialogService) {
    this.route.queryParams.subscribe(params => {
      this.name = params.name;

      this.getLayerInfo();
    });
  }

  ngOnInit(): void {
    this.initializeMap();
    this.addControls();
  }

  public addControls(): void {
    this.addScaleControl();
    this.addSearchControl();
    this.addZoomControl();
    this.addBackControl()
    this.addDownloadControl();
  }

  public addBackControl(): void {
    const back = L.control({ position: 'topleft' });
    back.onAdd = () => {
      const button = L.DomUtil.create('button', 'btn-control');
      button.classList.add('leaflet-control', 'leaflet-control-layers');
      button.title = 'Volver';
      button.addEventListener('click', () => {
        window.history.back();
      });
      const icon = document.createElement('i');
      icon.classList.add('pi', 'pi-arrow-circle-left');
      button.appendChild(icon);
      return button;
    }
    back.addTo(this.map);
  }

  /**
   * Añade logo al mapa
   */
  public addLogoControl(): void {
    const logo = L.control({ position: 'topleft' });
    logo.onAdd = () => {
      const div = L.DomUtil.create('div', 'info');
      div.innerHTML = `<img src="assets/images/logo-corpocaldas.png" width="139px" height="100px"></img>`;
      return div;
    };
    logo.addTo(this.map);
  }

  private addDownloadControl(): void {
    const download = L.control({ position: 'topleft' });
    download.onAdd = () => {
      const button = L.DomUtil.create('button', 'btn-control');
      button.classList.add('leaflet-control', 'leaflet-control-layers');
      button.title = 'Descargar';
      button.addEventListener('click', () => {
        this.downloadLayer();
      });
      const icon = document.createElement('i');
      icon.classList.add('pi', 'pi-download');
      button.appendChild(icon);
      return button;
    }
    download.addTo(this.map);
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

  public downloadLayer(): void {
    if (this.layer.accessGranted === 1) {
      this.downloadShapefile();
    } else if (this.layer.accessGranted === 2) {
      this.haveCredentials();
    }
  }

  public downloadShapefile(): void {
    this.dialogService.open(TermsComponent, {
      width: 'auto',
      closable: false,
      closeOnEscape: false
    }).onClose.subscribe(result => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Descarga', detail: 'En un momento será redirigido a la descarga.' });
        const link = document.createElement('a');
        link.target = '_blank';
        link.download = this.name;
        link.href = this.geoServer + this.layer.nameWorkspace.replace(' ', '_') +
          '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + this.layer.nameWorkspace.replace(' ', '_') + '%3A' + this.name + '&maxFeatures=50&outputFormat=SHAPE-ZIP';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link.remove();
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Descarga', detail: 'Debido a que no aceptó los términos de acceso a la información no podrá descargarla.' });
      }
    });
  }

  private getLayerInfo(): void {
    this.service.getLayerByName(this.name).subscribe(res => {
      this.layer = res;
      this.name = this.layer.referenceName;
      const layer = L.tileLayer.wms(this.geoServer + this.layer.nameWorkspace.replace(' ', '_') + '/wms?', {
        layers: this.name,
        format: 'image/png',
        transparent: true,
      }).addTo(this.map);

      this.layersControl.addOverlay(layer, this.layer.name);
    }, err => {
      console.error(err);
    });
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
      center: L.latLng(5.309346, -75.307057),
      zoomControl: false,
      zoom: 10,
      layers: [openStreetMap]
    });

    this.addLogoControl();

    this.layersControl = L.control.layers(baselayers, null, { position: 'topleft', collapsed: false });
    this.layersControl.addTo(this.map);
  }

  /**
   * Limpia la animación cuando el feature haya sido dejado por el mouse.
   * @param e Información del feature
   */
  private resetFeature(e: any): void {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: 'black',
      fillOpacity: 0.8,
      fillColor: 'transparent'
    });
  }

  private haveCredentials(): void {
    this.confirmService.confirm({
      message: `¿Tienes las credenciales para acceder a ${this.layer.name}?`,
      acceptLabel: 'Si, descargar con token.',
      rejectLabel: 'No, hacer solicitud.',
      accept: () => {
        this.verifyTokenAccess();
      },
      reject: (type) => {
        type === ConfirmEventType.REJECT ? this.sendRequestAccessLayer() : null;
      }
    });
  }

  private verifyTokenAccess(): void {
    const dialog = this.dialogService.open(VerifyAccessTokenComponent, {
      width: '50%',
      data: { layerId: this.layer.id },
      header: 'Verificación de token'
    });
    dialog.onClose.subscribe(res => {
      if (res !== undefined && res !== null) {
        this.downloadShapefile()
      }
    })
  }

  private sendRequestAccessLayer(): void {
    const dialog = this.dialogService.open(RegisterAccessRequestComponent, {
      width: '50%',
      data: { layer: this.layer },
      header: `Acceso a ${this.layer.name}`
    });
    dialog.onClose.subscribe(res => {
      if (res !== null && res !== undefined) {
        this.service.saveAccessRequest(res).subscribe(() => {
          if (this.layer.accessGranted === 1) {
            this.downloadShapefile();
          } else {
            this.messageService.add({ severity: 'success', summary: 'Petición de acceso', detail: 'La petición de acceso fue radicada exitosamente, en el transcurso de las 24 horas se le dará acceso' });
          }
        }, err => {
          console.log(err);
        });
      }
    });
  }

}
