import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { WorkSpaceDto } from 'src/app/model/WorkSpaceDto';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-select-workspace',
  templateUrl: './select-workspace.component.html',
  styleUrls: ['./select-workspace.component.scss']
})
export class SelectWorkspaceComponent implements OnInit {

  @Input()
  workspaceId: number;
  @Input()
  workspaceSelected: number;
  workspaces: TreeNode[];
  @Output() selectWorkspaceEvent = new EventEmitter<number>();
  selectedNode: TreeNode;
  loading: boolean = false;
  eventPage: LazyLoadEvent;
  totalRecords: number;

  constructor(private service: AdminService) { }

  ngOnInit(): void {
    debugger;
  }

  public getWorkSpaces(event: LazyLoadEvent): void {
    this.loading = true;
    this.eventPage = event;
    this.service.getWorkspaces(null, event !== null ? event.first / event.rows : null, event !== null ? event.rows : null).subscribe(res => {
      this.workspaces = this.service.buildTree(res.data);
      this.workspaceSelected !== null && this.workspaceSelected !== undefined ? this.selectInitialParent(this.workspaceSelected, this.workspaces) : null;
      this.workspaceId !== null && this.workspaceId !== undefined ? this.removeReference(this.workspaceId, this.workspaces) : null;
      this.totalRecords = res.numberRows;
      this.loading = false;
    }, err => {
      console.error(err);
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
  
  private removeReference(id: number, nodes: TreeNode[]): void {
    for (const node of nodes) {
      if (node.data.id === id) {
        node.selectable = false;
        node.draggable = true;
        break;
      } else {
        this.removeReference(id, node.children);
      }
    }
  }

  private selectInitialParent(idParent: number, nodes: TreeNode[]): void {
    for (const node of nodes) {
      if (node.data.id === idParent) {
        this.selectedNode = node;
        break;
      } else {
        this.selectInitialParent(idParent, node.children);
      }
    }
  }

  public nodeSelect(event: any): void {
    this.selectWorkspaceEvent.emit(event.node.data.id);
  }

  public nodeUnselect(event: any): void {
    this.selectWorkspaceEvent.emit(null);
  }

}
