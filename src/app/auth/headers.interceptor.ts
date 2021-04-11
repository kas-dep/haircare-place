import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Basic ${currentUser.token}`
                })
            });
         } else {
            request = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                })
            });
        }
        return next.handle(request);
    }
}
