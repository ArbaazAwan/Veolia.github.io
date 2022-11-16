import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('login_auth');
    this._isLoggedIn$.next(!!token);
  }

  CLIENT_URL: string = environment.baseUrl + 'login';

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  userLogin(email: string, password: string) {
    return this.http
      .post(
        this.CLIENT_URL,
        { email: email, password: password },
        { headers: this.headers }
      )
      .pipe(
        tap((res: any) => {
          this._isLoggedIn$.next(true);
        })
      );
  }

  logout(){

    localStorage.removeItem('clientId');
    localStorage.removeItem('siteId');
    localStorage.removeItem('login_auth');
  }
}
