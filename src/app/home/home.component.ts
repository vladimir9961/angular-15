import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Data for child card component to send
  FETCHED_DATA_POPULAR: any;
  FETCHED_DATA_TOP_RATED: any;
  TYPE_OF_FETCHED_DATA_POPULAR: string;
  TYPE_OF_FETCHED_DATA_TOP_RATED: string;

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
  toogleMovieTvTopRated(ovaj) {
    this.getTopRated(ovaj.target.checked ? 'tv' : 'movie')
  }
  //Fetch movies and tv's
  getPopular(prop) {
    this.homeservice.getDataHomePage(prop, 'popular').subscribe((res: any) => {
      if (prop === "movie") {
        this.TYPE_OF_FETCHED_DATA_POPULAR = "movies"
      } else {
        this.TYPE_OF_FETCHED_DATA_POPULAR = prop
      }
      this.FETCHED_DATA_POPULAR = res.results.slice(0, 9)
    })
  }
  getTopRated(prop) {
    this.homeservice.getDataHomePage(prop, 'top_rated').subscribe((res: any) => {
      if (prop === "movie") {
        this.TYPE_OF_FETCHED_DATA_TOP_RATED = "movies"
      } else {
        this.TYPE_OF_FETCHED_DATA_TOP_RATED = prop
      }
      this.FETCHED_DATA_TOP_RATED = res.results.slice(0, 9)
    })
  }
}
