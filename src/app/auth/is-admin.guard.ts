import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){
  //   this.authService.isAdmin$.subscribe(
  //     (isAdmin:boolean)=>
  //     {
  //       if(!isAdmin)
  //       this.router.navigate(['/dashboard']);
  //       this.isAdmin = isAdmin;
  //     }
  // )
  }
  isAdmin:boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAdmin$;
  }

}
