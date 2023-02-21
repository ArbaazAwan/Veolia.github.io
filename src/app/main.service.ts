import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private authService: AuthService) {}
  checkTokenExpirationInterval:any;

  setToken(token: string) {
    const tokenData:any = jwt_decode(token);
    const expirationTime = new Date(tokenData.exp * 1000);
    const expiresIn = expirationTime.getTime() - new Date().getTime();
    this.startCheckTokenExpiration();
    setTimeout(() => {
      this.authService.logout();
    }, expiresIn);
  }

  startCheckTokenExpiration() {
    if (this.checkTokenExpirationInterval) {
      clearInterval(this.checkTokenExpirationInterval);
    }
    this.checkTokenExpirationInterval = setInterval(() => {
      this.checkTokenExpiration();
    }, 5 * 60 * 1000);
  }

  checkTokenExpiration() {
    console.log('checking token')
    const token = sessionStorage.getItem('login_auth');
    if (!token) {
      return;
    }
    const isTokenExpired = this.isTokenExpired(token);
    if (isTokenExpired) {
      this.authService.logout();
    }
  }

  isTokenExpired(token: string): boolean {
    const decodedToken:any = jwt_decode(token);
    const expirationTime = new Date(decodedToken.exp * 1000);
    return expirationTime < new Date();
  }



}
