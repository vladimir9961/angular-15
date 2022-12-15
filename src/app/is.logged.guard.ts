import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor() { }
  isAuthenticated() {
    if (localStorage.getItem('session_id')) {
      return true;
    } else {
      return false
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log(this.isAuthenticated());
    return this.isAuthenticated();
  }
  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   return this.isAuthenticated()
  // }
}

