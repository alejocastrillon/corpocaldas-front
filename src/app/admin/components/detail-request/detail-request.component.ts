import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.component.html',
  styleUrls: ['./detail-request.component.scss']
})
export class DetailRequestComponent implements OnInit {

  access: AccessRequest = new AccessRequest();
  optionFilterSelected: number;

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private service: AdminService) { 
    this.access = this.config.data.access;
    this.optionFilterSelected = this.config.data.optionFilterSelected;
  }

  ngOnInit(): void {
  }


  public update(value: boolean): void {
    this.access.approved = value;
    this.service.updateAccess(this.access).subscribe(res => {
      this.ref.close(res);
    }, err => {
      console.error(err);
      this.ref.close();
    })
  }

}
