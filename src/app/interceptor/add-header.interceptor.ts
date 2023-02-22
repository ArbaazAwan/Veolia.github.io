import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token =  sessionStorage.getItem('login_auth');
    let jsonReq = request.clone({
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': "'*'",
        'Access-Control-Allow-Headers': "'*'",
        'Authorization': `${token}`
      }
    })

    return next.handle(jsonReq);
  }
}
