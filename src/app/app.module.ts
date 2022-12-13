import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { LoginComponent } from './components/navbar/login/login.component';
import { NavComponent } from './components/navbar/nav.component';
import { IsLogedComponent } from './components/navbar/loged/is-loged/is-loged.component';
import { InteractionsModule } from './components/interactions/interactions.module';
import { LoginService } from './components/navbar/login/service/login.service';
import { CardsComponent } from './components/cards/cards.component';
import { AlertComponent } from './components/alert/alert.component';
import { IsLoggedGuard } from './is.logged.guard';
import { PopularComponent } from './movie/displayMovies/popular.component';
import { FiltersComponent } from './movie/filters/filters.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InteractionsModule,
  ],
  declarations: [
    AppComponent,
    MovieComponent,
    HomeComponent,
    DisplayComponent,
    LoginComponent,
    NavComponent,
    IsLogedComponent,
    CardsComponent,
    AlertComponent,
    PopularComponent,
    FiltersComponent,
  ],
  providers: [LoginService, IsLoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
