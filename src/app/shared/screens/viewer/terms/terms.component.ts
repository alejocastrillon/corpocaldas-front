import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private ref: DynamicDialogRef) { }

  ngOnInit(): void {
  }

  close(agree: boolean) {
    this.ref.close(agree);
  }

}
