import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-data-form',
  templateUrl: './edit-data-form.component.html',
  styleUrls: ['./edit-data-form.component.less']
})
export class EditDataFormComponent implements OnInit {
  form: FormGroup;
  valid = true;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditDataFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
    this.form = this.buildEditUserForm();
    this.form.valueChanges.subscribe(() => this.valid = false);
  }

  buildEditUserForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.data.id, Validators.required],
      nick: [this.data.nick, [Validators.required, Validators.maxLength(10)]],
      firstName: [this.data.firstName, Validators.required],
      lastName:  [this.data.lastName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      hairType: [this.data.hairType, Validators.required]
    });
  }

  getErrorMessage(fileName: string): string {
    if (this.form.get(fileName).hasError('required')){
      return 'To pole jest wymagane!';
    }
    if (this.form.get(fileName).hasError('maxlength') && fileName === 'nick'){
      return 'Maksymalna długość to 10 znaków!';
    }
    if (this.form.get(fileName).hasError('email') && fileName === 'email'){
      return 'Niepoprawny format adresu email!';
    }
    return '';
  }

  updateUser(): void {
    this.userService.updateUser(this.form.value).subscribe(() => {
      if (this.authService.currentUserValue.userNick !== this.form.value.nick) {
        this.authService.setUserNick(this.form.value.nick);
      }
      this.dialogRef.close(this.form.value);
    });
  }
}
