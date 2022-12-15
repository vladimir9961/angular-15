import { Location } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { PagesService } from 'src/app/pages.service';
import { Genres, Ifilters } from 'src/app/interface/card.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() filterActivated = new EventEmitter<{ dataObject: any[] }>();
  genres: Genres[];
  FromDate = new Date();
  ToDate = this.addOneYear(new Date());
  showGenres = false;
  genreSubscription!: Subscription | undefined;
  dataSubscription!: Subscription | undefined;
  showFilterButton = false
  panelOpenState = false;
  filter: any = {
    type: "",
    sort_by: "",
    genres: "",
    date_from: "",
    date_to: "",
    pagination: "",
    user_score_left: "",
    user_score_right: "",
    user_vote: "",
    runtime_left: "",
    runtime_right: ""
  };
  dataObject: any[];
  constructor(private location: Location, private pages: PagesService) { }

  ngOnInit(): void {
    let locationPath = this.location.path();
    let locationSegments: any[];
    if (locationPath.length) locationSegments = locationPath.split('/');
    this.filter.type = locationSegments[1]
    this.genreSubscription = this.pages.getGenres(locationSegments[1])
      .subscribe(
        (res: any) => {
          this.genres = res.genres
        }
      )
  }
  //Date picker from
  OnDateChangeFrom(e) {
    let mon = e.getMonth() + 1 + ""
    let mm = ""
    let dd = ""
    if (e.getMonth() + 1 < 10) {
      mm = "0" + mon
    } else {
      mm = e.getMonth() + 1 + ""
    }
    if (e.getDate() < 10) {
      dd = "0" + e.getDate()
    } else {
      dd = e.getDate() + ""
    }
    let year = e.getFullYear() + ""
    let fullDate = + year + "-" + mm + "-" + dd
    this.filter.date_from = fullDate;
    this.showFilterButton = true
  }
  //Date picker from to
  OnDateChangeTo(e) {
    let mon = e.getMonth() + 1 + ""
    let mm = ""
    let dd = ""
    if (e.getMonth() + 1 < 10) {
      mm = "0" + mon
    } else {
      mm = e.getMonth() + 1 + ""
    }
    if (e.getDate() < 10) {
      dd = "0" + e.getDate()
    } else {
      dd = e.getDate() + ""
    }
    let year = e.getFullYear() + ""
    let fullDate = + year + "-" + mm + "-" + dd
    this.filter.date_to = fullDate
    this.showFilterButton = true
  }
  //Sort by options dropdwon get value
  onSelected(value: string): void {
    this.filter.sort_by = value
    this.showFilterButton = true
  }
  //Get genre id
  getGenreId(id) {
    this.filter.genres = id;
    this.showFilterButton = true
  }
  //Sliders
  getUserScoreLeft(e) {
    this.filter.user_score_left = e.target.value
    this.showFilterButton = true
  }
  getUserScoreRight(e) {
    this.filter.user_score_right = e.target.value
    this.showFilterButton = true
  }
  getUserVote(e) {
    this.filter.user_vote = e.target.value
    this.showFilterButton = true
  }
  getRuntimeLeft(e) {
    this.filter.runtime_left = e.target.value
    this.showFilterButton = true
  }
  getRuntimeRight(e) {
    this.filter.runtime_right = e.target.value
    this.showFilterButton = true
  }
  addOneYear(date) {
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }
  collectValueFromFilter() {
    this.dataSubscription = this.pages.getData(this.filter).subscribe((res: any) => {
      this.filterActivated.emit(res.results);
    })
  }
  ngOnDestroy(): void {
    // this.genreSubscription.unsubscribe();
    // this.dataSubscription.unsubscribe();
  }
}
