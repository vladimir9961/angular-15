import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  error: string;
  saveUser = false;
  show = false;
  constructor(private loginService: LoginService) { }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  //Save username and password in local storage
  checkBox() {
    this.saveUser = !this.saveUser
    if (this.saveUser) {
      if (this.loginForm.get('username')?.value && this.loginForm.get('password')?.value.trim()) {
        localStorage.setItem('username', JSON.stringify(this.loginForm.get('username')?.value))
        localStorage.setItem('password', JSON.stringify(this.loginForm.get('password')?.value))
      }
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  }
  //Check local storage if user saved login and password
  ngOnInit(): void {
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
      this.saveUser = true;
      this.loginForm.setValue({
        username: JSON.parse(localStorage.getItem('username')),
        password: JSON.parse(localStorage.getItem('password'))
      });
    }
  }
  submitLogin() {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    //Handle login
    this.loginService.requestToken()
      .subscribe((res: any) => {
        this.loginService.validateToken(username, password, res.request_token
        )
          .subscribe((data: any) => {
            this.loginService.getSession({ "request_token": data.request_token })
              .subscribe((res: any) => {
                localStorage.setItem('session_id', JSON.stringify(res.session_id));
                window.location.href = ""
              })
          },
            (err) => { this.error = err.error.status_message }
          )
      })
  }
}
