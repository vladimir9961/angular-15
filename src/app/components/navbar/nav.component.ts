import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  //If session exist user is loged data recived from parent (app-component) display user profile button with logout
  @Input() isLogged;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onKeyDownEvent(event: any) {
    this.router.navigate(['search/', `${event.target.value}`]);
    event.target.value = ""
  }

  display() {
    this.router.navigate([`login`])
  }
}
