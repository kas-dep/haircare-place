import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent implements OnInit {
  showSpinner = false;
  constructor( private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.spinnerService.getSpinnerObserver().subscribe((show) => {
      this.showSpinner = show;
      this.cdRef.detectChanges();
    });
  }
}
