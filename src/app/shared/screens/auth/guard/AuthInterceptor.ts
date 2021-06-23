import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): any {
        debugger;
        const token = sessionStorage.getItem('ACCESS_TOKEN');
        const userId = sessionStorage.getItem('ACCESS_USER');
        if (token) {
            request = request.clone({ setHeaders: { 'authorization-token': token } });
        }
        if (userId) {
            request = request.clone({ setHeaders: { 'authorization-user': userId } });
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }), catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/auth/login']).then(_ => console.log('Redirigiendo al login'));
                }
                return throwError(error);
            })
        );
    }
}