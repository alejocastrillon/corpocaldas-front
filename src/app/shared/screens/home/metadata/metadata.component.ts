import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Layer } from 'src/app/model/Layer';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  layer: Layer;
  loading: boolean = true;
  response: any;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private service: HomeService) {
    this.layer = this.config.data.layer;
    this.getData();
  }

  ngOnInit(): void {
  }

  public getData(): void {
    this.service.getXmlData(this.layer.metadataUrl).subscribe(res => {
      this.response = res;
      this.loading = false;
    }, err => {
      console.error(err);
      if (err.status === 404) {
        this.ref.close(err.error.details[0]);
      }
    });
  }

}
