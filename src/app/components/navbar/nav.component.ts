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
  searchForm = new FormGroup({
    searchInput: new FormControl(''),
  })
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  get searchInput() {
    return this.searchForm.get('searchInput')?.value;
  }
  submitForm() {
    this.router.navigate(['search/', `${this.searchForm.get('searchInput')?.value}`])
    window.location.reload();
  }
  display() {
    this.router.navigate([`login`])
  }
}
