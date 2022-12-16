import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../pages.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {
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
  youtube: string;
  sanitizedBlobUrl: SafeResourceUrl;
  private subcribeVideos: Subscription;
  private subscribeSimilar: Subscription;
  private subscribeCast: Subscription;
  private subscribeDetails: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private pages: PagesService, private router: Router, private sanitizer: DomSanitizer) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  //On init get from url id of movie/tv and type movie/tv
  ngOnInit(): void {
    this.getIdFromUrl = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    let type = (this.activatedRoute.snapshot.paramMap.get('type'));
    type === "movies" ? this.TYPE_OF_FETCHED_DATA = "movie" : this.TYPE_OF_FETCHED_DATA = type
    this.getMovieTvDetails(this.getIdFromUrl, this.TYPE_OF_FETCHED_DATA);
    this.getSimilarMovieTv(this.getIdFromUrl, this.TYPE_OF_FETCHED_DATA);
    this.getCastCrew(this.getIdFromUrl, this.TYPE_OF_FETCHED_DATA);
    this.subcribeVideos = this.pages.getVideos(this.getIdFromUrl, this.TYPE_OF_FETCHED_DATA).subscribe(
      (res: any) => {
        this.youtube = `https://www.youtube.com/embed/${res.results[0].key}`
        this.sanitizedBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube);
      },
      ((err) => { console.log(err.error) })

    )

    //Check if user exists
    this.activatedRoute
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
    this.subscribeDetails = this.pages.getDataDisplayPage(id, type)
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
    this.subscribeSimilar = this.pages.getSimilar(id, type)
      .subscribe((res: any) => {
        this.SimilarObject = res.results
      })
  }
  display(type, id) {
    this.router.navigate([`display/${type}/${id}`]), { relativeToThisRoute: true }
  }
  //Fetch movie crew
  getCastCrew(id, type) {
    this.subscribeCast = this.pages.getCrewAndCast(id, type)
      .subscribe((res: any) => {
        this.CrewAndCast = res.cast;
      })
  }
  ngOnDestroy() {
    this.subscribeDetails.unsubscribe();
    this.subscribeSimilar.unsubscribe();
    this.subcribeVideos.unsubscribe();
    this.subscribeCast.unsubscribe();
  }
}

