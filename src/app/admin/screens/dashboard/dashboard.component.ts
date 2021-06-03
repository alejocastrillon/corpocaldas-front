import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { GuideComponent } from 'src/app/shared/components/guide/guide.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router, private service: AdminService, private dialogService: DialogService) { }


  ngOnInit(): void {
    this.items = [
      {
        label: 'Solicitudes',
        icon: 'pi pi-pw pi-file',
        command: () => {
          this.router.navigate(['admin/requests']);
        }
      },
      {
        label: 'Espacios de Trabajo',
        icon: 'pi pi-fw pi-images',
        command: () => {
          this.router.navigate(['admin/workspaces'])
        }
      },
      {
        label: 'Capas',
        icon: 'pi pi-fw pi-map',
        command: () => {
          this.router.navigate(['admin/layer']);
        }
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        command: () => {
          this.router.navigate(['admin/users']);
        }
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        }
      }
    ];
  }

  private logout(): void {
    this.service.logout().subscribe(res => {
      sessionStorage.clear();
      this.router.navigate(['/auth/login']);
    }, err => {
      console.error(err);
    });
  }

  public guide(): void {
    this.dialogService.open(GuideComponent, {
      header: 'Ayuda de Plataforma Virtual SIG-SIR - Administrador',
      width: 'auto'
    });
  }
}
