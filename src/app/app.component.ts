import { Component, OnInit,  } from '@angular/core';
import { LayoutService } from './shared-module/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isSidebarVisible = false;

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.sidebarSource$.subscribe(isVisible => this.isSidebarVisible = isVisible);
  }
}
