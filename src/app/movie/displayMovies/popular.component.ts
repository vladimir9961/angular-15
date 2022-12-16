import { Location } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, HostListener, OnDestroy, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit, OnDestroy, OnChanges {
  getMoviesSubscripton!: Subscription;
  page = 1
  currentPosition = window.pageYOffset;
  FetchedData: any = [];
  type: string;
  stopScroll = true
  // User filters data
  @Input() FilteredData: any;
  ngOnChanges(changed: SimpleChanges) {
    const changes = changed['FilteredData']
    if (changes.currentValue != undefined) {
      if (changes.previousValue === undefined) {
        this.FetchedData = []
      }
      this.FetchedData.push(...changes.currentValue)
    }
  }
  @HostListener('window:scroll', ['$event.target'])
  // Handle infinity scroll
  scroll(e) {
    let scroll = e.scrollingElement.scrollTop;
    if (scroll > this.currentPosition) {
      const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 20;
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

  constructor(private location: Location, private pages: PagesService) {
  }
  ngOnInit(): void {
    this.getPath(this.page);
  }
  getFilterResults(eventData) {
    this.FetchedData = [];
    this.FetchedData.push(...eventData);
  }
  //Fetch data
  async getPath(page: number) {
    let locationPath = this.location.path();
    let locationSegments: any[];
    if (locationPath.length) locationSegments = locationPath.split('/');
    this.type = locationSegments[1];
    this.getMoviesSubscripton = await this.pages.getMoviesOrTvs(locationSegments[1], locationSegments[2], page).subscribe((res: any) => {
      this.FetchedData.push(...res.results)
    })
  }

  ngOnDestroy(): void {
    this.getMoviesSubscripton.unsubscribe();
  }

  @ViewChild('getHeight') elementView: ElementRef;

}
