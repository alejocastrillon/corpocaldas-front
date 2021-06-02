import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SaveWorkspace } from 'src/app/model/SaveWorkspace';
import { WorkSpaceDto } from 'src/app/model/WorkSpaceDto';
import { AdminService } from '../../services/admin.service';
import { CreateWorkspaceComponent } from '../create-workspace/create-workspace.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class WorkspaceComponent implements OnInit {

  workspaces: TreeNode[];
  eventPage: LazyLoadEvent;
  totalRecords: number;
  loading: boolean = false;
  constructor(private service: AdminService, private messageService: MessageService, private confirmationService: ConfirmationService, private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  public getWorkSpaces(event: LazyLoadEvent): void {
    this.loading = true;
    this.eventPage = event;
    this.service.getWorkspaces(null, event !== null ? event.first / event.rows : null, event !== null ? event.rows : null).subscribe(res => {
      if (res.data !== null && res.data.length > 0) {
        this.workspaces = this.service.buildTree(res.data);
      }
      this.totalRecords = res.numberRows;
      this.loading = false;
    }, err => {
      console.error(err);
      this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + err.status + ' ' + err.statusText });
    })
  }

  public onNodeExpand(event: any): void {
    this.loading = true;
    const node = event.node;
    this.service.getWorkspace(node.data.id).subscribe(res => {
      for (const workspace of res.workspaceChildrens) {
        node.children.push({
          data: {
            id: workspace.id,
            name: workspace.name
          },
          leaf: !workspace.hasChildren,
          children: []
        });
      }
      this.workspaces = [...this.workspaces];
      this.loading = false;
    })
  }

  

  public addWorkspace(): void {
    this.openDialog(new SaveWorkspace());
  }

  public editWorkspace(workspace: WorkSpaceDto): void {
    this.openDialog(Object.assign({}, workspace));
  }

  private buildSaveObject(workspace: any): SaveWorkspace {
    let work: SaveWorkspace = new SaveWorkspace();
    work.id = workspace.id;
    work.name = workspace.name;
    work.parent = new SaveWorkspace();
    work.parent.id = workspace.parentId;
    return work;
  }

  private openDialog(workspace: any): void {
    let saveWorkSpace: SaveWorkspace = this.buildSaveObject(workspace);
    console.log(this.workspaces);
    let dialog = this.dialogService.open(CreateWorkspaceComponent, {
      width: '50%',
      header: `${workspace.id !== undefined && workspace.id !== null ? 'Modificar' : 'Crear'} espacio de trabajo`,
      data: {
        workspace: saveWorkSpace,
        workspaces: this.workspaces !== undefined ? this.workspaces.slice() : null
      }
    });
    dialog.onClose.subscribe(res => {
      if (res !== null && res !== undefined) {
        this.getWorkSpaces(this.eventPage);
        this.messageService.add({ severity: 'success', summary: `${workspace.id !== null ? 'Modificación' : 'Registro'} de espacio de trabajo`, detail: `El espacio de trabajo ha sido ${workspace.id !== null ? 'modificado' : 'registrado'} satisfactoriamente` });
      }
    })
  }

}
