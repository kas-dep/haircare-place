import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  loginRegisterEvent$ = new Subject<boolean>();

  hideLoginRegisterComponent(): void {
    this.loginRegisterEvent$.next(false);
  }
}
