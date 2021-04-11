import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerEvent$ = new BehaviorSubject<boolean>(false);

  getSpinnerObserver(): Observable<boolean> {
    return this.spinnerEvent$.asObservable();
  }

  showSpinner(): void {
    this.spinnerEvent$.next(true);
  }

  hideSpinner(): void {
    this.spinnerEvent$.next(false);
  }

}
