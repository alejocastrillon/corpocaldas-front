import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.items = [
      {
        label: 'Solicitudes',
        icon: 'pi pi-pw pi-file',
        command: () => {
          this.router.navigate(['admin/layer']);
        }
      },
      {
        label: 'Capas',
        icon: 'pi pi-fw pi-clone',
        command: () => {
          this.router.navigate(['admin/layer']);
        }
      }
    ];
  }
}
