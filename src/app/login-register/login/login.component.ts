import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  form: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  @Output() isRegistrationNeeded = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  getErrorMessage(fileName: string): string {
    if (this.form.get(fileName).hasError('required')){
      return 'To pole jest wymagane!';
    }
    if (this.form.get(fileName).hasError('minlength') && fileName === 'password'){
      return 'Za krótkie hasło!';
    }
    if (this.form.get(fileName).hasError('email') && fileName === 'email'){
      return 'Niepoprawny format adresu email!';
    }
    return '';
  }

  handleSubmit(): void {
    this.authService
      .login(this.form.value)
      .pipe(first())
      .subscribe(
        (result) => {
          if (result.token) {
            this.router.navigate(['/moja-kosmetyczka']);
          }
        },
        error => this.errorMessage = error.error.result.errorDesc
      );
  }

  goToRegister(): void {
    this.isRegistrationNeeded.emit(false);
  }
}
