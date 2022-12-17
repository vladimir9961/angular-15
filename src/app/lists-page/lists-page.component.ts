import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagesService } from '../pages.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lists-page',
  templateUrl: './lists-page.component.html',
  styleUrls: ['./lists-page.component.scss']
})
export class ListsPageComponent implements OnInit, OnDestroy {
  lists: any;

  private subscribeGetUserLists: Subscription
  constructor(private pages: PagesService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  //Get all lists created by user
  ngOnInit(): void {
    this.subscribeGetUserLists = this.pages.getUserCreatedLists()
      .subscribe((res: any) => {
        this.lists = res.results;
        console.log(res)
      })
  }
  navigateToCreateList() {
    this.router.navigate([`new_list`]), { relativeToThisRoute: true }
  }
  navigateToList(id) {
    this.router.navigate([`list/${id}`]), { relativeToThisRoute: true }
  }
  ngOnDestroy(): void {
    this.subscribeGetUserLists.unsubscribe();
  }
}
