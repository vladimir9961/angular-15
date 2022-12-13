import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit {
  @Input() FETCHED_DATA: any;
  @Input() TYPE_OF_FETCHED_DATA: string;
  private test: Subscription;
  userExist: boolean;
  checkedId: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  passIdToHolder(id: number) {
    this.checkedId = id;
  }

  ngOnInit(): void {
    //Check if user exists
    this.test = this.route
      .data
      .subscribe((v: any) => this.userExist = v.userExists);
  }
  ngOnDestroy(): void {
    this.test.unsubscribe()
  }
  //Redirect to display page on click to display movie/tv
  display(props: any) {
    this.router.navigate(['display/', `${props.type}`, `${props.id}`]), { relativeTo: this.route }
  }
}
