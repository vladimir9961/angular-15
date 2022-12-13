import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/pages.service';
import { of, tap, map } from 'rxjs';
import { Genres } from 'src/app/interface/card.model';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  genres: Genres[];
  showGenres = false;
  constructor(private location: Location, private pages: PagesService) { }

  ngOnInit(): void {
    let locationPath = this.location.path();
    let locationSegments: any[];
    if (locationPath.length) locationSegments = locationPath.split('/');
    this.pages.getGenres(locationSegments[1])
      .subscribe(
        (res: any) => {
          this.genres = res.genres
          console.log(this.genres);
        }
      )
  }
  onSelected(value: string): void {
    console.log(value);
  }
  getGenreId(id) {
    console.log(id);
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
