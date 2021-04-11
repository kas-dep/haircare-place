import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../shared-module/spinner/spinner.service';
import { ToastService } from '../shared-module/toast/toast.service';
import { tap } from 'rxjs/operators';
import { ToastType } from '../shared-module/toast/toast.model';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private spinnerService: SpinnerService, private toastService: ToastService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.showSpinner();
        return this.handler(next, request);
    }

    handler(next, request): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse){
                        this.spinnerService.hideSpinner();
                    }
                },
                (error: HttpErrorResponse) => {
                    this.spinnerService.hideSpinner();
                    const toast = {
                      message: error.error,
                      type: ToastType.ERROR,
                    };
                    this.toastService.showToast(toast);
                    throw error;
                }));
    }
}
