import { Component, OnInit } from '@angular/core';
import { CallAlertService } from './call.alert.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(private callalertservice: CallAlertService) { }
  display: boolean;
  message: string;
  alertClass: string;
  test: any = [];
  ngOnInit(): void {
    this.callalertservice.displayAlert.subscribe((displayAlert) => {
      this.message = this.callalertservice.textMessage;
      this.alertClass = this.callalertservice.alertType
      this.display = displayAlert;
      if (displayAlert) {
        setTimeout(() => {
          this.callalertservice.displayAlert.next(false)
        }, 4000);
      }
    })
  }

}
