import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService ) { }

  @Output() isLoginNeeded = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.form = this.buildForm();
  }
  handleSubmit(): void {
    this.authService.register(this.form.value).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      nick: ['', [Validators.required, Validators.maxLength(10)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      hairType: ['', [Validators.required]]
    });
  }

  getErrorMessage(fileName: string): string {
    if (this.form.get(fileName).hasError('required')){
      return 'To pole jest wymagane!';
    }
    if (this.form.get(fileName).hasError('minlength') && fileName === 'password'){
      return 'Hasło musi składac się z conajmniej 6 znaków!';
    }
    if (this.form.get(fileName).hasError('maxlength') && fileName === 'nick'){
      return 'Maksymalna długość to 10 znaków!';
    }
    if (this.form.get(fileName).hasError('email') && fileName === 'email'){
      return 'Niepoprawny format adresu email!';
    }
    return '';
  }

  goToLogin(): void {
    this.isLoginNeeded.emit(false);
  }
}
