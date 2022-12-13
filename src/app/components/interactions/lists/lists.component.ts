import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InteractionsService } from '../interactions.service';
import { Subscription } from 'rxjs'
import { CallAlertService } from '../../alert/call.alert.service';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {
  @Input() IdOfItem;
  @Input() TYPE_OF_FETCHED_DATA;
  @Input() Name;
  showLists = false;
  createdLists;
  constructor(private interactions: InteractionsService, private callalert: CallAlertService) { }
  private subscribtion: Subscription
  ngOnInit(): void {
  }
  toggleListsView() {
    this.showLists = !this.showLists;
    if (this.showLists === true) {
      this.subscribtion = this.interactions.createLists().subscribe((res: any) => {
        this.createdLists = res.results
      })
    }
  }

  addToLists(id, lists_name) {
    this.subscribtion = this.interactions.add_to_list(id, this.IdOfItem)
      .subscribe(
        res => {
          this.callalert.textMessage = `"${this.Name}" succesfuly add to list "${lists_name}"`;
          this.callalert.alertType = "success"
          this.callalert.displayAlert.next(true);
        },
        err => {
          this.callalert.alertType = "danger"
          this.callalert.textMessage = `"${this.Name}" alredy exists on "${lists_name}"`;
          this.callalert.displayAlert.next(true);
        }
      )

  }
  ngOnDestroy() {
    // this.subscribtion.unsubscribe()
  }
}
