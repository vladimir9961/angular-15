import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NLoggedGuard implements CanActivate {
  isAuthenticated() {
    if (localStorage.getItem('session_id')) {
      return false;
    } else {
      return true
    }
  }
  canActivate(): boolean {
    return this.isAuthenticated();
  }

}
