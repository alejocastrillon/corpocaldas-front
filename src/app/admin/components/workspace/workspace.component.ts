import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
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
      this.workspaces = this.buildTree(res.data);
      this.totalRecords = res.numberRows;
      this.loading = false;
    }, err => {
      console.error(err);
      this.messageService.add({ severity: 'error', summary: 'Capas', detail: 'Error: ' + err.status + ' ' + err.statusText });
    })
  }

  public buildTree(workspaces: Array<WorkSpaceDto>): TreeNode[] {
    return Object.keys(workspaces).reduce<TreeNode[]>((accumulator, key) => {
      let value = workspaces[key];
      let node: TreeNode = {};
      node.label = value.name;
      node.data = value;
      if (value != null) {
        if (typeof value["childrens"] === "object" && value["childrens"].length > 0) {
          node.children = this.buildTree(value["childrens"]);
        } else {
          node.children = [];
        }
      }
      return accumulator.concat(node);
    }, []);
  }

  public addWorkspace(): void {
    this.openDialog(new WorkSpaceDto());
  }

  public editWorkspace(workspace: WorkSpaceDto): void {
    this.openDialog(Object.assign({}, workspace));
  }

  private openDialog(workspace: WorkSpaceDto): void {
    console.log(workspace);
    let dialog = this.dialogService.open(CreateWorkspaceComponent, {
      width: '50%',
      header: `${workspace.id !== undefined && workspace.id !== null ? 'Modificar' : 'Crear'} espacio de trabajo`,
      data: {
        workspace: workspace,
        workspaces: this.workspaces.slice()
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
