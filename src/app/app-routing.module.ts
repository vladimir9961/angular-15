import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';

import { PopularComponent } from './movie/displayMovies/popular.component';
import { HomeComponent } from './home/home.component';
import { NoPageComponent } from './no-page/no-page.component';
import { WatchlistComponent } from './watchlist-page/watchlist.component';
import { IsLoggedGuard } from './is.logged.guard';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './components/navbar/login/login.component';
import { NLoggedGuard } from './n-logged.guard';
import { ListsPageComponent } from './lists-page/lists-page.component';
import { ListComponent } from './lists-page/list/list.component';
import { NewListComponent } from './lists-page/new-list/new-list.component';
import { AddMovieToListComponent } from './lists-page/new-list/add-movie-to-list/add-movie-to-list.component';
const userHere = () => {
  if (localStorage.getItem('session_id') == null) {
    return false
  } else {
    return true
  }
}
const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: { userExists: userHere() },
  },
  {
    path: 'movie',
    data: { userExists: userHere() },
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
    data: { userExists: userHere() },
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
    path: 'lists',
    component: ListsPageComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'new_list',
    component: NewListComponent,
    canActivate: [IsLoggedGuard],
    children: [
      {
        path: 'add_movie_to_list/:id',
        component: AddMovieToListComponent
      }
    ]
  },
  {
    path: 'list/:id',
    component: ListComponent,
    canActivate: [IsLoggedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NLoggedGuard]
  },
  {
    path: 'search/:query',
    component: SearchComponent,
  },
  {
    path: 'display/:type/:id',
    pathMatch: 'full',
    component: DisplayComponent,
    data: { userExists: userHere() }
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
