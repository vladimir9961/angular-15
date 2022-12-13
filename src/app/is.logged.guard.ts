import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivateChild {
  constructor() { }
  isAuthenticated() {
    if (localStorage.getItem('session_id')) {
      return true;
    } else {
      return false
    }
  }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   console.log('CanActivate called');
  //   console.log(this.isAuthenticated(), 'ovde');

  //   return this.isAuthenticated();
  // }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticated()
  }
}

