import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagesService } from '../pages.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Data for child card component to send
  FETCHED_DATA_POPULAR: any;
  FETCHED_DATA_TOP_RATED: any;
  TYPE_OF_FETCHED_DATA_POPULAR: string;
  TYPE_OF_FETCHED_DATA_TOP_RATED: string;
  private subsribeHomeData: Subscription;
  constructor(private homeservice: PagesService) { }

  //On first initialisation fetch movies
  ngOnInit(): void {
    this.getPopular('movie');
    this.getTopRated('movie');

  }
  //Toggle cards within container Movie/Tv
  toogleMovieTv(event) {
    this.getPopular(event.target.checked ? 'tv' : 'movie')
  }
  toogleMovieTvTopRated(event) {
    this.getTopRated(event.target.checked ? 'tv' : 'movie')
  }
  //Fetch movies and tv's popular section
  getPopular(prop) {
    this.subsribeHomeData = this.homeservice.getDataHomePage(prop, 'popular').subscribe((res: any) => {
      prop === "movie" ? this.TYPE_OF_FETCHED_DATA_POPULAR = "movies" : this.TYPE_OF_FETCHED_DATA_POPULAR = prop
      this.FETCHED_DATA_POPULAR = res.results.slice(0, 9)
    })
  }
  //Fetch movies and tv's toprated section
  getTopRated(prop) {
    this.subsribeHomeData = this.homeservice.getDataHomePage(prop, 'top_rated').subscribe((res: any) => {
      prop === "movie" ? this.TYPE_OF_FETCHED_DATA_TOP_RATED = "movies" : this.TYPE_OF_FETCHED_DATA_TOP_RATED = prop

      this.FETCHED_DATA_TOP_RATED = res.results.slice(0, 9)
    })
  }
  ngOnDestroy(): void {
    this.subsribeHomeData.unsubscribe();
  }
}
