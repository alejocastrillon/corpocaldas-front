import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';

@Component({
  selector: 'app-create-layer',
  templateUrl: './create-layer.component.html',
  styleUrls: ['./create-layer.component.scss']
})
export class CreateLayerComponent implements OnInit {

  accessGrantedOptions = [
    { name: 'Información Corpocaldas', code: 1 },
    { name: 'Información de otras entidades', code: 2 }
  ];

  layer: Layer = new Layer();
  error: boolean = false;
  layerForm: FormGroup;

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.layer = config.data.layer;
  }

  ngOnInit(): void {
    this.validateForm();
  }

  private validateForm(): void {
    this.layerForm = this.fb.group({
      'id': [this.layer.id],
      'name': [this.layer.name, [Validators.required]],
      'referenceName': [this.layer.referenceName, [Validators.required]],
      'accessGranted': [this.layer.accessGranted, [Validators.required]],
      'visible': [this.layer.visible]
    });

  }

  public selectParentWorkspace(event: number): void {
    if (event !== null && event !== undefined) {
      this.layer.idWorkspace = event;
      this.error = false;
    } else {
      this.layer.idWorkspace = null;
      this.error = true;
    }
  }

  public onSelectFile(event: any): void {
    this.layer.file = event.files !== null && event.files.length > 0 ? event.files[0] : null;
  }

  public cancel(): void {
    this.ref.close(null);
  }

  public saveLayer(): void {
    this.ref.close(this.layer);
  }

}
