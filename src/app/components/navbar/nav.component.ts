import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  //If session exist user is loged data recived from parent (app-component) display user profile button with logout
  @Input() isLogged;

  constructor() { }

  ngOnInit(): void {
  }

}
