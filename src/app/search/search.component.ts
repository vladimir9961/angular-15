import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  show = 'movie';
  gender = []
  gender_lenght: number;
  mediaMovie = [];
  movie_lenght: number;
  mediaTv = [];
  tv_lenght: number;
  private subscribeSearch: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private pages: PagesService, private router: Router) { }
  ngOnInit() {
    this.subscribeSearch = this.pages.search(this.activatedRoute.snapshot.paramMap.get('query')).subscribe((res: any) => {
      this.gender.push(res.results.filter(i => 'person'.includes(i.media_type)));
      this.mediaMovie.push(res.results.filter(i => 'movie'.includes(i.media_type)));
      this.mediaTv.push(res.results.filter(i => 'tv'.includes(i.media_type)));

      this.gender_lenght = this.gender[0].length;
      this.movie_lenght = this.mediaMovie[0].length;
      this.tv_lenght = this.tv_lenght[0].length;
    })
  }
  display(t) {
    this.show = t[0].value
  }
  onDisplay(type, id) {
    this.router.navigate(['display/', `${type}`, `${id}`])
  }
  ngOnDestroy(): void {
    this.subscribeSearch.unsubscribe()
  }
}
