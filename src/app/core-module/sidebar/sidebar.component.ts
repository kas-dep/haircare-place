import { Component, OnInit } from '@angular/core';
import { style} from '@angular/animations';
import { animate, trigger, state, transition } from '@angular/animations'
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ transform: 'translateY(-100px)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateY(-100px)' }))
      ])

    ]),

    trigger('upAndDownAnimation', [
      state('down', style({
        transform: 'rotateX(0deg)'
      })),
      state('up', style({
       transform: 'rotateX(180deg)'
      })),
      transition('down => up', animate('400ms ease-out')),
      transition('up => down', animate('400ms ease-in'))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  down = true;
  show = false;
  userNick: string = this.authService.getUserNick();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => this.userNick = user.userNick);
  }

  showNestedMenu(): void {
    this.show = !this.show;
    this.down = !this.down;
  }
  get stateName(): string {
    return this.down ? 'down' : 'up';
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['./login']);
  }

}
