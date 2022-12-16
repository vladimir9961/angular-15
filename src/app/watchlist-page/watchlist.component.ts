import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit, OnDestroy {
  public watchData: any;
  IdOfItem: number;
  private subscribeWatchlist: Subscription;
  constructor(private pages: PagesService, private router: Router) { }
  ngOnInit(): void {
    this.subscribeWatchlist = this.pages.getWatchlist('movies')
      .subscribe((res: any) => {
        this.watchData = res.results
        this.IdOfItem = res.results.id
      })
  }
  toogleMovieTv(e) {
    this.getWatchlistMovieTv(e.target.checked ? 'tv' : 'movies');
  }
  getWatchlistMovieTv(props) {
    this.subscribeWatchlist = this.pages.getWatchlist(props).subscribe((res: any) => {
      this.watchData = res.results
      this.IdOfItem = res.results.id
    })
  }
  display(props: any) {
    this.router.navigate(['display/', `${props.type}`, `${props.id}`])
  }
  ngOnDestroy(): void {
    this.subscribeWatchlist.unsubscribe();
  }
}
