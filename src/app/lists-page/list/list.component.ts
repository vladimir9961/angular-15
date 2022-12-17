import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagesService } from 'src/app/pages.service';
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router';
import { CallAlertService } from 'src/app/components/alert/call.alert.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  listDetails: any;
  items: any;
  averageListRate: number;
  listId: string;
  private subcribtionGetListsDetails: Subscription;
  constructor(private pages: PagesService, private activatedRoute: ActivatedRoute, private router: Router, private alertservice: CallAlertService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.listId = this.activatedRoute.snapshot.paramMap.get('id');

    this.subcribtionGetListsDetails = this.pages.getListDetails(this.listId).subscribe(
      (res: any) => {
        this.listDetails = res;
        this.items = res.items
        this.avg(res.items)
        console.log(res)
      })
  }
  //Get Average Vote of list
  avg(items) {
    let list_items = items.map(item => {
      return item.vote_average
    })
    let sum = list_items.reduce((a, b) => a + b, 0);
    this.averageListRate = (sum / list_items.length) || 0;
  }
  new_list() {
    this.router.navigate(['new_list'])
  }
  //Navigate to add movie to list component
  addToListButton() {
    this.router.navigate(['new_list/add_movie_to_list/', this.listId]);
  }
  //Navigate to display page
  display(type, id) {
    this.router.navigate(['display/', `${type}`, `${id}`])
  }
  //Delete list
  delete_list() {
    this.pages.delete_list(this.listId)
      .subscribe(res => {
        this.alertservice.alertType = "danger"
        this.alertservice.textMessage = `You successfuly deleted list`;
        this.alertservice.displayAlert.next(true);
      },
        (err: any) => { console.log(err.error) })
    this.router.navigate(['/lists'])
  }
  ngOnDestroy(): void {
    this.subcribtionGetListsDetails.unsubscribe();
  }
}
