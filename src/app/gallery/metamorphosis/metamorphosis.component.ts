import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetamorphosisImage, MetamorphosisResponse } from '../gallery-model';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-metamorphosis',
  templateUrl: './metamorphosis.component.html',
  styleUrls: ['./metamorphosis.component.less'],
})
export class MetamorphosisComponent implements OnInit {
  theLatestImg: MetamorphosisImage;
  theOldestImg: MetamorphosisImage;
  constructor(private galleryService: GalleryService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.galleryService.getMetamorphosisPictures(this.data.userId).subscribe((result: MetamorphosisResponse) => {
      this.theOldestImg = result.images[0];
      this.theLatestImg = result.images[1];
    });
  }
}
