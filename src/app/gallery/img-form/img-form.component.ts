import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-img-form',
  templateUrl: './img-form.component.html',
  styleUrls: ['./img-form.component.less']
})
export class ImgFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private galleryService: GalleryService,
    public dialogRef: MatDialogRef<ImgFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  form: FormGroup;
  header: string;
  userId: number = this.authService.getUserId();
  today = new Date().toISOString().slice(0, 10);
  imgBtnText = 'Dodaj zdjęcie';
  handleClick: () => void;
  url: string | Blob = '';
  imageSrc: Blob;
  imgChanged = false;

  ngOnInit(): void {
    if (this.data.isEditMode){
      this.form = this.buildEditGalleryForm();
      this.header = 'Edytuj dane';
      this.imgBtnText = 'Edytuj zdjęcie';
      this.handleClick = this.updatePicture;
      this.imageSrc = this.data.image;
      this.url = this.imageSrc;
    } else {
      this.form = this.buildGalleryForm();
      this.header = 'Dodaj zdjęcie';
      this.handleClick = this.addPicture;
      this.url = '../../../assets/images/curly-avatar.PNG';
    }
  }

  addPicture(): void {
    this.galleryService.addPicture(this.form.value).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }
  updatePicture(): void {
    this.galleryService.updatePicture(this.form.value).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }

  buildGalleryForm(): FormGroup {
    return this.formBuilder.group({
      date: [this.today, Validators.required],
      note: ['', Validators.required],
      image: ['', Validators.required],
      userId: this.userId,
    });
  }
  buildEditGalleryForm(): FormGroup {
    
    const { img, image } = this.data;
    return this.formBuilder.group({
      id: img.id,
      date: [img.date.slice(0, 10), Validators.required],
      note: img.note,
      image: [image, Validators.required],
      userId: this.userId,
    });
  }

  handleSelectFile(e): void {
    if (e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgChanged = true;
        this.url = event.target.result;
        this.form.controls.image.setValue(this.url);
      };
    }
  }
}
