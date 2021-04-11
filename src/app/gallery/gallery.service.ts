import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {MetamorphosisResponse, Picture, PictureResponse, PicturesResponse} from './gallery-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/picture`;

  addPicture(picture: Picture): Observable<Picture> {
    return this.http.post<Picture>(`${this.apiUrl}/add`, picture);
  }

  getPictures(userId: number): Observable<PicturesResponse> {
    return this.http.get<PicturesResponse>(`${this.apiUrl}/pictures/${userId}`);
  }

  getMetamorphosisPictures(userId: number): Observable<MetamorphosisResponse> {
    return this.http.get<MetamorphosisResponse>(`${this.apiUrl}/metamorphosis/${userId}`);
  }

  getPicture(pictureId: number): Observable<PictureResponse> {
    return this.http.get<PictureResponse>(`${this.apiUrl}/${pictureId}`);
  }

  updatePicture(picture: Picture): Observable<Picture> {
    return this.http.put<Picture>(`${this.apiUrl}/update`, picture);
  }
  deletePicture(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
