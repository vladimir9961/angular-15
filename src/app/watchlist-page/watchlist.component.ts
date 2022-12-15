import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  public watchData: any;
  IdOfItem
  constructor(private pages: PagesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.pages.getWatchlist('movies')
      .subscribe((res: any) => {
        this.watchData = res.results
        this.IdOfItem = res.results.id
      })
  }
  toogleMovieTv(e) {
    this.getWatchlistMovieTv(e.target.checked ? 'tv' : 'movies');
  }
  getWatchlistMovieTv(props) {
    this.pages.getWatchlist(props).subscribe((res: any) => {
      this.watchData = res.results
      this.IdOfItem = res.results.id
    })
  }
  display(props: any) {
    this.router.navigate(['display/', `${props.type}`, `${props.id}`]), { relativeTo: this.route }
  }
}
