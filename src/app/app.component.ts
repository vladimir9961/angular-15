import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged = true;
  ngOnInit(): void {
    if (localStorage.getItem('session_id') == null) {
      this.isLogged = false
    } else {
      this.isLogged = true
    }
  }
}
