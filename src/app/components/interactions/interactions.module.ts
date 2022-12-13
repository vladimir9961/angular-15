import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolderComponent } from './holder.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { WatchlistsComponent } from './watchlists/watchlists.component';
import { ListsComponent } from './lists/lists.component';
import { StarsComponent } from './stars/stars.component';
import { BarRatingModule } from "ngx-bar-rating";
@NgModule({
  imports: [
    CommonModule,
    BarRatingModule
  ],
  declarations: [
    HolderComponent,
    FavoriteComponent,
    WatchlistsComponent,
    ListsComponent,
    StarsComponent,
  ],
  exports: [
    HolderComponent
  ]
})
export class InteractionsModule { }
