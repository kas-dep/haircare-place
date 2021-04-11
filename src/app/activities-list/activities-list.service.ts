import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Activity, ActivityResponse, CommonResponse } from './activities.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesListService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}/activities`;

  addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/add`, activity);
  }

  getActivities(userId: number): Observable<ActivityResponse> {
    return this.http.get<ActivityResponse>(`${this.apiUrl}/${userId}`);
  }

  updateActivity(activity: Activity): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(`${this.apiUrl}/update`, activity);
  }

  deleteActivity(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
