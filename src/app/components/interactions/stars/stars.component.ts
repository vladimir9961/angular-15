import { Location } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CallAlertService } from '../../alert/call.alert.service';
import { InteractionsService } from '../interactions.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() IdOfItem;
  @Input() TYPE_OF_FETCHED_DATA;
  @Input() Name;
  rate: number;
  showStars: boolean = false;
  private subscribeDeleteRate: Subscription;
  private subscribeChangeRate: Subscription;
  private subscribeGetRate: Subscription;


  constructor(private interaction: InteractionsService, private callalert: CallAlertService, private activatedRoute: ActivatedRoute, private location: Location) { }
  ngOnInit(): void {
    let getIdFromUrl = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    let type = (this.activatedRoute.snapshot.paramMap.get('type'));
    if (getIdFromUrl) {
      this.TYPE_OF_FETCHED_DATA = type;
      this.getIdRated(getIdFromUrl)
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    let changed = changes['IdOfItem']
    const route = this.location.path()
    if (route.includes("/watchlist")) {
      this.getIdRated(this.IdOfItem)
    }
    //If on display page
    else {
      if (changed?.currentValue != undefined && changed.firstChange === false) {
        this.getIdRated(this.IdOfItem)
      }
    }

  }
  displayStars() {
    this.showStars = !this.showStars
  }
  onUnrate() {
    this.subscribeDeleteRate = this.interaction.delete_rate(this.IdOfItem, this.TYPE_OF_FETCHED_DATA).subscribe(res => {
      this.callalert.alertType = "danger"
      this.callalert.textMessage = `You successfuly removed rate for "${this?.Name}"`;
      this.callalert.displayAlert.next(true);
    })
  }
  //If user rates movie or tv
  onRateChange(rated) {
    this.subscribeChangeRate = this.interaction.on_rate_change(this.IdOfItem, rated, this.TYPE_OF_FETCHED_DATA).subscribe(
      (res: any) => {
        if (res.status_code === 12) {
          this.callalert.alertType = "success"
          this.callalert.textMessage = `You successfuly rated "${this.Name}" with "${rated}" stars!`;
          this.callalert.displayAlert.next(true);
        }
      },
      (err: any) => { console.log(err.error) }
    )
  }
  //Filter object to see if item exist or not and update the movieTvExists variable true/false
  getIdRated(id: number) {
    this.subscribeGetRate = this.interaction.getAllRatedMovies(this.TYPE_OF_FETCHED_DATA).subscribe(
      (res: any) => {
        const movieTvExists = res.results.filter(favoriteObject => favoriteObject.id === id);
        if (movieTvExists[0] != undefined) {
          this.rate = movieTvExists[0].rating
        }
      },

      (err: any) => { console.log(err) })
  }
  ngOnDestroy(): void {
    this.subscribeDeleteRate?.unsubscribe();
    this.subscribeChangeRate?.unsubscribe();
    this.subscribeGetRate?.unsubscribe();
  }
}
