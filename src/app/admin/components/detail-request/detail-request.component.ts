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

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef, private service: AdminService) { 
    this.access = this.config.data.access;
  }

  ngOnInit(): void {
  }

}
