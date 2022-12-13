import { Location } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  page = 1
  currentPosition = window.pageYOffset;
  routerSubscription: Subscription | undefined;
  FetchedData: any = [];
  type: string;
  stopScroll = true
  @HostListener('window:scroll', ['$event.target'])
  //Handle infinity scroll
  scroll(e) {
    let scroll = e.scrollingElement.scrollTop;
    if (scroll > this.currentPosition) {
      const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      if (endOfPage) {
        if (this.stopScroll) {
          this.page++
          this.getPath(this.page);
          this.stopScroll = false
          setTimeout(() => {
            this.stopScroll = true
          }, 500);
        }
      }
    }
    this.currentPosition = scroll;
  }

  constructor(private location: Location, private pages: PagesService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.getPath(this.page);
  }
  //Fetch data
  async getPath(page: number) {
    let locationPath = this.location.path();
    let locationSegments: any[];
    if (locationPath.length) locationSegments = locationPath.split('/');
    this.type = locationSegments[1];
    this.routerSubscription = await this.pages.getMoviesOrTvs(locationSegments[1], locationSegments[2], page).subscribe((res: any) => {
      this.FetchedData.push(...res.results)
    })
  }

  ngOnDestroy(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => true;
  }

  @ViewChild('getHeight') elementView: ElementRef;

}
