import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.less'],
  encapsulation: ViewEncapsulation.Emulated

})
export class StarRatingComponent implements OnInit {
  @Input('rate') private rate: number;
  @Input('starCount') private starCount: number;
  @Input('isEditMode') private isEditMode: boolean;
  @Output() private rateUpdated = new EventEmitter();

  constructor() { }

  ratesArray = [];

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratesArray.push(index);
    }
  }

  handleClick(rate: number): void {
    this.rateUpdated.emit(rate);
  }

  loadIcon(index: number): string {
    if (this.rate >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
