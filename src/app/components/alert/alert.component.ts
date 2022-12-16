import { Component, OnDestroy, OnInit } from '@angular/core';
import { CallAlertService } from './call.alert.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  private alertSubscription: Subscription
  constructor(private callalertservice: CallAlertService) { }
  alert = []
  ngOnInit(): void {
    this.alertSubscription = this.callalertservice.displayAlert.subscribe((displayAlert) => {
      this.alert.push({ message: this.callalertservice.textMessage, alertClass: this.callalertservice.alertType, display: displayAlert })
      //After 5 secconds remove first created object from array 
      setTimeout(() => {
        this.alert = this.alert.filter((_, index) => index !== 0);
      }, 5000);
    })
  }
  //On click remove allert by index
  removeAlert(i: number) {
    this.alert = this.alert.filter((_, index) => index !== i);
  }
  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe()
  }
}
