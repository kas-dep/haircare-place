import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditDataFormComponent } from './edit-data-form/edit-data-form.component';
import { UserService } from './user.service';
import { User, UserResponse } from './user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.authService.getUserId()).subscribe((result: UserResponse) => {
      this.user = result.user;
    });
  }

  openDialog(): void {
    const dialog = this.dialog.open(EditDataFormComponent, {
      width: '50vw',
      data: this.user,
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
  }

}
