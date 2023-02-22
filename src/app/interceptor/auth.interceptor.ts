
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token =  sessionStorage.getItem('login_auth');

  //   if (token) {
  //     // If we have a token, we set it to the header
  //     request = request.clone({
  //       setHeaders: { Authorization: `Authorization token ${token}` }
  //     });
  //   }

  //   return next.handle(request).pipe(
  //     catchError((err) => {
  //       if (err instanceof HttpErrorResponse) {
  //         if (err.status === 401) {
  //           // redirect user to the logout page
  //           this.router.navigate(['/login']);
  //         }
  //       }
  //       return throwError(err);
  //     })
  //   )
  // }

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

