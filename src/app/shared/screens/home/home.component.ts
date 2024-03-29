import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, Message, MessageService, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';
import { GuideComponent } from '../../components/guide/guide.component';
import { detailMessage } from '../../constants/message.constants';
import { HomeService } from './home.service';
import { MetadataComponent } from './metadata/metadata.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit {

  optionsFilter: Array<any> = [
    {
      name: 'Todas las capas',
      code: null
    },
    {
      name: 'Información Corpocaldas',
      code: 1
    },
    {
      name: 'Información de otras entidades',
      code: 2
    }
  ];
  valueAccess: number;
  eventPage: LazyLoadEvent = null;
  numberOfRows: number;
  loading = false;
  layers: Array<Layer> = [];
  msgs: Message[];
  workspaces: TreeNode[];
  totalRecords: number;

  constructor(private router: Router, private service: HomeService, private messageService: MessageService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.msgs = [
      { severity: 'info', summary: '', detail: detailMessage }
    ];
  }

  public getWorkSpaces(event: LazyLoadEvent): void {
    this.loading = true;
    this.eventPage = event;
    this.service.getWorkspaces(null, event !== null ? event.first / event.rows : null, event !== null ? event.rows : null)
      .subscribe(res => {
        if (res.data !== null && res.data.length > 0) {
          this.workspaces = this.service.buildTree(res.data);
        }
        this.totalRecords = res.numberRows;
        this.loading = false;
      }, err => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + err.status + ' ' + err.statusText });
      });
  }

  public onNodeExpand(event: any): void {
    if (event.node.children.length === 0) {
      this.loading = true;
      const node = event.node;
      this.service.getWorkspace(node.data.id).subscribe(res => {
        for (const layer of res.layers) {
          if (layer.visible) {
            node.children.push({
              data: {
                id: layer.id,
                name: layer.name,
                metadataUrl: layer.metadataUrl,
                icon: 'pi pi-fw pi-map',
                object: 'layer',
                owner: this.getNameOptionsFilter(layer.accessGranted)
              }
            });
          }
        }
        for (const workspace of res.workspaceChildrens) {
          if (node.children.find(x => x.data.id === workspace.id) === undefined) {
            node.children.push({
              data: {
                id: workspace.id,
                name: workspace.name,
                icon: 'pi pi-fw pi-images',
                object: 'workspace',
                owner: ''
              },
              leaf: !workspace.hasChildren,
              children: []
            });
          }
        }
        node.children.sort((a, b) => {
          return a.data.name.localeCompare(b.data.name);
        });
        this.workspaces = [...this.workspaces];
        this.loading = false;
      });
    }
  }

  public getLayers(event: LazyLoadEvent, valueAccess: number): void {
    this.eventPage = event;
    this.loading = true;
    this.valueAccess = valueAccess;
    const name: string = event !== null && event.filters.name !== null && event.filters.name !== undefined
      ? event.filters.name.value : null;
    this.service.getLayers(name, this.valueAccess, true, event !== null ? event.first / event.rows : null,
      event !== null ? event.rows : null).subscribe(res => {
        const data: Array<Layer> = [];
        if (res.data !== null && res.data.length > 0) {
          for (const r of res.data) {
            const layer: Layer = new Layer().fromJSON(r);
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

  public metadataInfo(layer: Layer): void {
    let dialog = this.dialogService.open(MetadataComponent, {
      width: '60%',
      height: '350px',
      header: `Metadatos de ${layer.name}`,
      data: {
        layer: layer
      }
    });
    dialog.onClose.subscribe(res => {
      if (res !== null && res !== undefined) {
        this.messageService.add({severity: 'error', detail: res, summary: 'Archivos de metadata'});
      }
    });
  }

  public navigateToViewer(data: any): void {
    data.object === 'layer' ? this.router.navigate(['viewer'], { queryParams: { id: data.id } }) : null;
  }

  public guide(): void {
    this.dialogService.open(GuideComponent, {
      header: 'Ayuda de Plataforma Virtual SIG-SIR',
      width: 'auto'
    });
  }

  getNameOptionsFilter(accessGranted): string {
    return this.optionsFilter.find(x => x.code === accessGranted).name;
  }

}
