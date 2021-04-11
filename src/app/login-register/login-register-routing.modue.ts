import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';

const loginRegisterRoutes: Route[] = [
  {path: 'login', component: LoginAndRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(loginRegisterRoutes)],
  exports: [RouterModule]
})
export class LoginRegisterRoutingModule {}
