import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  title: string;
  getIdFromUrl: number;
  Name: string;
  TYPE_OF_FETCHED_DATA: string;
  movieData: any;
  runtimeHours: number;
  runtimeMin: number;
  SimilarObject: any;
  CrewAndCast: any;
  userExist: boolean;
  constructor(private activatedRoute: ActivatedRoute, private route: ActivatedRoute, private pages: PagesService) { }
  //On init get from url id of movie/tv and type movie/tv
  ngOnInit(): void {
    this.getIdFromUrl = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    let type = (this.activatedRoute.snapshot.paramMap.get('type'));
    type === "movies" ? this.TYPE_OF_FETCHED_DATA = "movie" : this.TYPE_OF_FETCHED_DATA = type
    this.getMovieTvDetails(this.getIdFromUrl, this.TYPE_OF_FETCHED_DATA);
    this.getSimilarMovieTv(this.getIdFromUrl, this.TYPE_OF_FETCHED_DATA);
    this.getCastCrew(this.getIdFromUrl, this.TYPE_OF_FETCHED_DATA);
    //Check if user exists
    this.route
      .data
      .subscribe((v: any) => this.userExist = v.userExists);
  }
  //Transfor minutes to hours 
  convertMinsToHrsMins(mins: number) {
    let h: number = Math.floor(125 / 60);
    let m = 125 % 60;
    h = h < 10 ? 0 + h : h;
    m = m < 10 ? 0 + m : m;
    this.runtimeHours = h
    this.runtimeMin = m;
  }
  //Fetch info about movie/tv
  getMovieTvDetails(id, type) {
    this.pages.getDataDisplayPage(id, type)
      .subscribe(
        (data: any) => {
          this.title = data?.original_title
          this.convertMinsToHrsMins(data.runtime)
          this.movieData = data
        },
        (err: any) => { console.log(err) }
      )
  }
  getSimilarMovieTv(id, type) {
    this.pages.getSimilar(id, type)
      .subscribe((res: any) => {
        this.SimilarObject = res.results
      })
  }
  //Fetch movie crew
  getCastCrew(id, type) {
    this.pages.getCrewAndCast(id, type)
      .subscribe((res: any) => {
        this.CrewAndCast = res.cast;
      })
  }
}

