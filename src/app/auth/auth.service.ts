import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private userService:UserService)
  {

    const token = localStorage.getItem('login_auth');
    this._isLoggedIn$.next(!!token);
  }

  email = localStorage.getItem('user_email');
  CLIENT_URL: string = environment.baseUrl + 'login';

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _isAdmin$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = this._isAdmin$.asObservable();

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

    initializeRole(){
     this.userService.getUserByEmail(this.email).pipe(
      tap((res:any)=>{
        if(res[0].role == 'admin')
          this._isAdmin$.next(true);
      }))
  }

  logout()
  {

    localStorage.removeItem('clientId');
    localStorage.removeItem('siteId');
    localStorage.removeItem('user_email');
    localStorage.removeItem('login_auth');
    this._isAdmin$.next(false);
  }
}
