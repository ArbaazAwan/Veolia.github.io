import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('login_auth');
    this._isLoggedIn$.next(!!token);
  }

  url: string = 'http://127.0.0.1:3000/login';
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  userLogin(email: string, password: string) {
    this.http
      .post(
        this.url,
        { email: email, password: password },
        { headers: this.headers }
      )
      .subscribe((response: any) => {
        this._isLoggedIn$.next(true);

        localStorage.setItem('login_auth',response.token);
      });
  }
}
