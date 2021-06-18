import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { SaveWorkspace } from 'src/app/model/SaveWorkspace';
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
    
  }

  public getWorkSpaces(event: LazyLoadEvent): void {
    this.loading = true;
    this.eventPage = event;
    this.service.getWorkspaces(null, event !== null ? event.first / event.rows : null, event !== null ? event.rows : null).subscribe(res => {
      if (res.data !== null && res.data.length > 0) {
        this.workspaces = this.service.buildTree(res.data);
      }
      debugger;
      this.workspaceSelected !== null && this.workspaceSelected !== undefined ? this.selectInitialParent(this.workspaceSelected, this.workspaces) : null;
      this.workspaceId !== null && this.workspaceId !== undefined ? this.removeReference(this.workspaceId, this.workspaces) : null;
      this.totalRecords = res.numberRows;
      this.loading = false;
    }, err => {
      console.error(err);
    })
  }

  public onNodeExpand(event: any): void {
    debugger;
    const node = event.node;
    if (node.children === undefined ||node.children.length === 0) {
      this.loading = true;
      this.service.getWorkspace(node.data.id).subscribe(res => {
        for (const workspace of res.workspaceChildrens) {
          let parent: SaveWorkspace = new SaveWorkspace();
          parent.id = node.data.id;
          let nodeData: TreeNode = {
            data: {
              id: workspace.id,
              name: workspace.name,
              parent: parent
            },
            leaf: !workspace.hasChildren,
            children: []
          };
          if (this.selectedNode == null || this.selectedNode == undefined) {
            if (workspace.id === this.workspaceSelected) {
              this.selectedNode = nodeData;
            }
          }
          node.children.push(nodeData);
        }
        this.workspaces = [...this.workspaces];
        this.loading = false;
      });
    }
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

  private selectInitialParent(parentId: number, nodes: TreeNode[]): void {
    for (const node of nodes) {
      debugger;
      if (node.data.id === parentId) {
        this.selectedNode = node;
        break;
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
