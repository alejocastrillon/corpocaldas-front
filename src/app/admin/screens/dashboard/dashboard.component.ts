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


  ngOnInit() {
    this.items = [
      {
        label: 'Solicitudes',
        icon: 'pi pi-pw pi-file',
        command: () => {
          this.goToRequests()
        }
      },
      {
        label: 'Registros',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Recursos Públicos',
            icon: 'pi pi-fw pi-globe',
            command: () => {
              this.router.navigate(['admin/public-resources']);
            }
          }
        ]
      }
    ];
  }

  goToRequests() {
    this.router.navigate(['admin/requests']);
  }

}
