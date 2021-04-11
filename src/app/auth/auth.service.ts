import { Injectable  } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';
import { AuthUserResponse, AuthUser } from './auth-model';
import { LayoutService } from '../shared-module/services/layout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<AuthUserResponse>;
  public currentUser: Observable<AuthUserResponse>;

  constructor(private http: HttpClient, private layoutService: LayoutService) {
      this.currentUserSubject = new BehaviorSubject<AuthUserResponse>(JSON.parse(sessionStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }

  login(data: AuthUser): Observable<AuthUserResponse> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(map((resp: AuthUserResponse) => {
      if (resp.token){
        sessionStorage.setItem('currentUser', JSON.stringify(resp));
        this.currentUserSubject.next(resp);
        this.layoutService.showSidebar();
      }
      return resp;
    }));
  }

  public get currentUserValue(): AuthUserResponse {
    return this.currentUserSubject.value;
  }

  getUserId(): number {
    return this.currentUserValue.userId;
  }

  getUserNick(): string {
    return this.currentUserValue.userNick;
  }

  setUserNick(userNick: string): void {
    const updatedUser = { ...this.currentUserValue, userNick };
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }

  register(data: User): Observable<{}> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logOut(): void {
    this.layoutService.hideSidebar();
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }
}
