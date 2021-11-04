import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  layer: any;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.layer = this.config.data.layer;
  }

  ngOnInit(): void {
  }

  close(agree: boolean) {
    this.ref.close(agree);
  }

}
