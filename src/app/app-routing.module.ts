import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';

import { PopularComponent } from './movie/displayMovies/popular.component';
import { HomeComponent } from './home/home.component';
import { NoPageComponent } from './no-page/no-page.component';
import { WatchlistComponent } from './watchlist-page/watchlist.component';
import { IsLoggedGuard } from './is.logged.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: { userExists: IsLoggedGuard }
  },
  {
    path: 'movie',
    data: { userExists: IsLoggedGuard },
    children: [
      {
        path: 'popular',
        pathMatch: 'full',
        component: PopularComponent,
      },
      {
        path: 'now_playing',
        pathMatch: 'full',
        component: PopularComponent,
      },
      {
        path: 'upcoming',
        pathMatch: 'full',
        component: PopularComponent,
      },
      {
        path: 'top_rated',
        pathMatch: 'full',
        component: PopularComponent,
      }
    ],
  },
  {
    path: 'tv',
    data: { userExists: IsLoggedGuard },
    children: [
      {
        path: 'popular',
        pathMatch: 'full',
        component: PopularComponent,
      },
      {
        path: 'airing_today',
        pathMatch: 'full',
        component: PopularComponent,
      },
      {
        path: 'on_the_air',
        pathMatch: 'full',
        component: PopularComponent,
      },
      {
        path: 'top_rated',
        pathMatch: 'full',
        component: PopularComponent,
      }
    ],
  },
  {
    path: 'watchlist',
    component: WatchlistComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'display/:type/:id',
    pathMatch: 'full',
    component: DisplayComponent,
    data: { userExists: IsLoggedGuard }
  },
  {
    path: '**',
    component: NoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
