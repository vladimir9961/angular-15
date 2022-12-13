import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-is-loged',
  templateUrl: './is-loged.component.html',
  styleUrls: ['./is-loged.component.scss']
})
export class IsLogedComponent implements OnInit {
  username?: string;
  userimg?: string;

  constructor(private http: HttpClient, private router: Router) { }


  logOutUser() {
    localStorage.removeItem('session_id');
    localStorage.removeItem('account_id');
    window.location.href = ""
  }
  ngOnInit(): void {

    let getSession = JSON.parse(localStorage.getItem('session_id'))
    this.http.get(`https://api.themoviedb.org/3/account?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${getSession}`).subscribe((data: any) => {
      this.username = data.username;
      this.userimg = `https://secure.gravatar.com/avatar/${data.avatar.gravar}.jpg?s=32`;
      localStorage.setItem('account_id', JSON.stringify(data.id));
    })
  }

}
