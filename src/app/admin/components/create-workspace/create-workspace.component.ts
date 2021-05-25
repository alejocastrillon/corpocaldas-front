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
    this.workspaces = this.config.data.workspaces;
    this.workspace = this.config.data.workspace;
    debugger;
    this.label = this.workspace.id !== undefined && this.workspace.id !== null ? 'Modificar' : 'Guardar';
  }

  ngOnInit(): void {
    this.validateForm();
  }

  private validateForm(): void {
    this.workspaceFormGroup = this.formBuilder.group({
      "name": [this.workspace.name, Validators.required]
    });
  }

  public selectParentWorkspace(event: number): void {
    if (this.workspace.id !== event) {
      this.workspace.idParent = event;
      this.messageService.clear();
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: "No se puede seleccionar el mismo espacio de trabajo como contenedor del mismo"});
      this.workspace.idParent = null;
      this.error = true;
    }
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
