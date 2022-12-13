import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class LoginService {
  error_message: string;
  isLoggin = false;
  api_host = 'https://api.themoviedb.org/3/';
  api_key = '3b5caee89d6f1ccfb03cb837adb8e9e1';
  constructor(private http: HttpClient) { }
  requestToken() {
    return this.http.get(`${this.api_host}authentication/token/new?api_key=${this.api_key}`);
  }
  //Get requested token and validate with login
  validateToken(username, password, request_token) {
    return this.http.post(`${this.api_host}authentication/token/validate_with_login?api_key=${this.api_key}`, { username, password, request_token });

  }
  //If user exist and token is validate get session
  getSession(request_token) {
    return this.http.post(`${this.api_host}authentication/session/new?api_key=${this.api_key}`, request_token);
  }
}