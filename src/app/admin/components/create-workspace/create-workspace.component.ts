import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WorkSpaceDto } from 'src/app/model/WorkSpaceDto';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss'],
  providers: [MessageService]
})
export class CreateWorkspaceComponent implements OnInit {

  workspaces: TreeNode[];
  workspace: WorkSpaceDto;
  workspaceFormGroup: FormGroup;
  selectedNode: any;
  label: string;
  error: boolean = false;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private formBuilder: FormBuilder, private service: AdminService, private messageService: MessageService) { 
    this.workspace = this.config.data.workspace;
    this.label = this.workspace.id !== undefined && this.workspace.id !== null ? 'Modificar' : 'Guardar';
    this.workspaces = this.config.data.workspaces;
    this.workspace.id !== null ? this.removeReference(this.workspace.id, this.workspaces) : NullTemplateVisitor;
    this.workspace.idParent !== null ? this.selectInitialParent(this.workspace.idParent, this.workspaces) : null;
  }

  ngOnInit(): void {
    this.validateForm();
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

  private validateForm(): void {
    this.workspaceFormGroup = this.formBuilder.group({
      "name": [this.workspace.name, Validators.required]
    });
  }

  public nodeSelect(event: any): void {
    if (this.workspace.id !== event.node.data.id) {
      this.workspace.idParent = event.node.data.id;
      this.workspace.nameParent = event.node.data.name;
      this.messageService.clear();
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "No se puede seleccionar el mismo espacio de trabajo como contenedor del mismo"});
      this.workspace.idParent = null;
      this.workspace.nameParent = null;
      this.selectedNode = null;
      this.error = true;
    }
      
  }

  public nodeUnselect(event: any): void {
    this.workspace.idParent = null;
    this.workspace.nameParent = null
    this.messageService.clear();
    this.error = false;
  }

  public saveWorkSpace(): void {
    this.service.saveWorkspace(this.workspace).subscribe(res => {
      this.ref.close(res);
    }, err => {
      console.error(err);
      this.ref.close();
    });
  }

  public cancel(): void {
    this.ref.close();
  }

}
