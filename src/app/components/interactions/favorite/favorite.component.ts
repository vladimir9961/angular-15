import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallAlertService } from '../../alert/call.alert.service';
import { InteractionsService } from '../interactions.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})

export class FavoriteComponent implements OnInit, OnChanges {
  @Input() Name: string;
  @Input() itemExists: boolean;
  @Input() IdOfItem: number;
  @Input() TYPE_OF_FETCHED_DATA: string;
  constructor(private activatedRoute: ActivatedRoute, private interactions: InteractionsService, private callalert: CallAlertService) { }
  //On component mount if on /Display page get id from url
  ngOnInit(): void {
    let getIdFromUrl = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    let type = (this.activatedRoute.snapshot.paramMap.get('type'));
    if (getIdFromUrl) {
      this.TYPE_OF_FETCHED_DATA = type
      this.getIdFavorite(getIdFromUrl)
    }
  }
  //If changes accure user clicked dropdwon button and inputs value updated
  ngOnChanges(changes: SimpleChanges) {
    const changed = changes['IdOfItem']
    if (changed?.currentValue != undefined && changed.firstChange === false) {
      this.getIdFavorite(this.IdOfItem)
    }
  }
  //On click add or remove item from favorite list
  addRemoveFav() {
    this.interactions.add_or_remove_favorite(this.TYPE_OF_FETCHED_DATA, this.IdOfItem, this.itemExists)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.itemExists = !this.itemExists
          if (res.status_code === 13) {
            this.callalert.alertType = "danger"
            this.callalert.textMessage = `"${this.Name}" removed from favorite`;
          } else if (res.status_code === 1) {
            this.callalert.textMessage = `"${this.Name}" added to favorite`;
            this.callalert.alertType = "success"
          }
          this.callalert.displayAlert.next(true);
        }
      })
  }
  //Filter object to see if item exist or not and update the movieTvExists variable true/false
  getIdFavorite(id: number) {
    this.interactions.checkInFavorite(this.TYPE_OF_FETCHED_DATA).subscribe(
      (res: any) => {
        const movieTvExists = res.results.filter(favoriteObject => favoriteObject.id === id);
        if (movieTvExists[0] != undefined) {
          this.itemExists = true
        } else {
          this.itemExists = false
        }
      },

      (err => { console.log(err) }))
  }
}