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
    { name: 'Capa Pública', code: 1 },
    { name: 'Capa Privada', code: 2 }
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

  public cancel(): void {
    this.ref.close(null);
  }

  public saveLayer(): void {
    this.ref.close(this.layerForm.value);
  }

}
