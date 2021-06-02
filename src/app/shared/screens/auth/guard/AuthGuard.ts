import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public authService: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedRole;
        const token = sessionStorage.getItem('ACCESS_TOKEN');
        const userId = sessionStorage.getItem('ACCESS_USER');
        const role = sessionStorage.getItem('ACCESS_ROLE');
        if (token !== null && userId !== null && role !== null) {
            if (role === expectedRole) {
                return true;
            } else {
                this.router.navigate(['/auth/login']);
                return false;
            }
        }
        this.router.navigate(['/auth/login']);
        return false;
    }

}