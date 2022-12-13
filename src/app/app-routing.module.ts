import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { IsLoggedGuard } from './is.logged.guard';

import { MovieComponent } from './movie/movie.component';
import { PopularComponent } from './movie/displayMovies/popular.component';
// import { TvComponent } from './tv/tv.component';
//If user loged pass user logged trough routes or not
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
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    data: { userExists: userHere() }
  },
  {
    path: 'display/:type/:id',
    pathMatch: 'full',
    component: DisplayComponent,
    data: { userExists: userHere() }
  },
  {
    path: 'tv',
    component: MovieComponent,
    children: [
      {
        path: ':value',
        component: PopularComponent,
        data: { userExists: userHere() }
      }
    ],
  },
  {
    path: 'movie',
    component: MovieComponent,
    children: [
      {
        path: ':type:value',
        component: PopularComponent,
        data: { userExists: userHere() }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
