import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-login-and-register',
  animations: [
    trigger('showHideForm', [
      state('show', style({
        transform: 'scaleY(1)',
        display: 'block'
      })),
      state('hide', style({

        transform: 'scaleY(0)',
        display: 'none'
      })),
      transition('show => hide', [
        animate('.4s ease-in')
      ]),
      transition('hide => show', [
        animate('.4s .3s ease-in')
      ])
    ])
  ],
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.less'],
})
export class LoginAndRegisterComponent implements OnInit {
  constructor(private loginRegisterService: LoginRegisterService) {}

  isLoginView = true;
  isComponentVisible = true;

  ngOnInit(): void {
    this.loginRegisterService.loginRegisterEvent$.subscribe(isVisible => this.isComponentVisible = isVisible);
  }

  goToRegistration(isLoginView): void {
    if (!isLoginView) {
      this.isLoginView = !this.isLoginView;
    }
  }

  goToLogin(registerView): void {
    if (!registerView){
      this.isLoginView = !this.isLoginView;
    }
  }

  get login(): string {
    return this.isLoginView ? 'show' : 'hide';
  }
  get register(): string {
    return this.isLoginView ? 'hide' : 'show';
  }
}
