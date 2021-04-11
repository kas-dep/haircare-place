import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { LoginRegisterRoutingModule } from './login-register-routing.modue';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared-module/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginAndRegisterComponent],
  imports: [
    CommonModule,
    LoginRegisterRoutingModule,
    MatFormFieldModule,
    SharedModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent, LoginAndRegisterComponent]
})
export class LoginRegisterModule { }
