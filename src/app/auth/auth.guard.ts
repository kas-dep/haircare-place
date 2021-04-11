import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LayoutService } from '../shared-module/services/layout.service';
import { LoginRegisterService } from '../login-register/login-register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService,
              private router: Router,
              private layoutService: LayoutService,
              private loginRegisterService: LoginRegisterService,
              ) {}
  canLoad(): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.loginRegisterService.hideLoginRegisterComponent();
      this.layoutService.showSidebar();
      return true;
    }
    this.router.navigate(['/login']);
    this.layoutService.hideSidebar();
    return false;
  }
}
