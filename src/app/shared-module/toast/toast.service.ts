import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastModel } from './toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastEvent$ = new Subject<ToastModel>();

  showToast(toast: ToastModel): void {
    this.toastEvent$.next(toast);
  }
  constructor() { }
}
