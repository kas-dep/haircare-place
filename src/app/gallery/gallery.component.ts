import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ImgFormComponent } from './img-form/img-form.component';
import { MetamorphosisComponent } from './metamorphosis/metamorphosis.component';
import { ImageComponent } from './image/image.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { GalleryService } from './gallery.service';
import { AuthService } from '../auth/auth.service';
import { Picture } from './gallery-model';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationComponent } from '../shared-module/confirmation/confirmation.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less'],
})
export class GalleryComponent implements OnInit {
  userId: number = this.authService.getUserId();
  pictures: Picture[];
  dataSource: MatTableDataSource<Picture>;
  image: Blob;
  displayedColumns: string[] = ['date', 'note', 'actions'];

  constructor(
    public dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private galleryService: GalleryService,
    private authService: AuthService
  ) {}
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadPictures();
  }

  openMetamorphosisDialog(): void {
    this.dialog.open(MetamorphosisComponent, {
      width: '70vw',
      data: {
        userId: this.userId
      },
    });
  }

  showImageInDialog(picture: Picture): void {
    this.loadPicture(picture.id, picture.date);
  }

  openAddImgDialog(): void {
    const dialog = this.dialog.open(ImgFormComponent, {
      width: '50vw',
      data: {
        isEditMode: false,
      },
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.loadPictures();
      }
    });
  }

  loadPictures(): void {
    this.galleryService.getPictures(this.userId).subscribe((result) => {
      this.pictures = result.pictures;
      this.dataSource = new MatTableDataSource(this.pictures);

      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  openConfirmationDialog(pictureId: number): void {
    const dialog = this.dialog.open(ConfirmationComponent, {
      width: '35vw',
      data: {
        message: 'Czy na pewno chcesz usunąć wybrane zdjęcie?',
      },
    });
    dialog.afterClosed().subscribe((data) => {
      if (data === 'confirmed') {
        this.galleryService.deletePicture(pictureId).subscribe(
          () => {
            this.loadPictures();
          }
        );
      }
    });
  }

  getImageAndEdit(isEditMode: boolean, picture?: Picture): void {
    this.galleryService.getPicture(picture.id).subscribe((result) => {
      this.image = result.image;
      const dialog = this.dialog.open(ImgFormComponent, {
        width: '50vw',
        data: {
          isEditMode,
          img: picture,
          image: this.image,
        },
      });
      dialog.afterClosed().subscribe((data) => {
        if (data) {
          this.loadPictures();
        }
      });
    });
  }

  loadPicture(pictureId: number, date: string): void {
    this.galleryService.getPicture(pictureId).subscribe((result) => {
      this.image = result.image && result.image;
      this.dialog.open(ImageComponent, {
        width: '50vw',
        data: {
          image: this.image,
          date,
        },
      });
    });
  }
}
