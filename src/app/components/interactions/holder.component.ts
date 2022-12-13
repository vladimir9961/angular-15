import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HolderComponent implements OnInit {
  @Input() Name: string;
  @Input() IdOfItem: number;
  @Input() TYPE_OF_FETCHED_DATA: string;
  show: string;

  constructor(private readonly location: Location) {

  }
  ngOnInit() {
    const route = this.location.path()
    if (route.includes("/display")) {
      this.show = 'show'
    }
  }

}
