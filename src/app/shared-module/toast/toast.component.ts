import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastModel, ToastType } from './toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.less'],
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])

    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {

  message: string;
  show = false;
  timeoutId = null;
  color: ToastType;
  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastEvent$.subscribe((toast: ToastModel) => {
      this.showToast(toast);
    });
  }

  ngOnDestroy(): void {
    this.hideToast();
  }

  showToast(toast: ToastModel): void {
    this.show = true;
    this.message = toast.message;
    this.color = toast.type;
    this.timeoutId = setTimeout(() => {
      this.show = false;
    }, 5000);
  }

  hideToast(): void {
    this.show = false;
    clearTimeout(this.timeoutId);
  }

}
