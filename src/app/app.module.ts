import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { NoPageComponent } from './no-page/no-page.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { WatchlistComponent } from './watchlist-page/watchlist.component';
import { SearchComponent } from './search/search.component';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { ListsPageComponent } from './lists-page/lists-page.component';
import { MatIconModule } from '@angular/material/icon';
import { ListComponent } from './lists-page/list/list.component';
import { NewListComponent } from './lists-page/new-list/new-list.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddMovieToListComponent } from './lists-page/new-list/add-movie-to-list/add-movie-to-list.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InteractionsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DisplayComponent,
    LoginComponent,
    NavComponent,
    IsLogedComponent,
    CardsComponent,
    AlertComponent,
    PopularComponent,
    FiltersComponent,
    NoPageComponent,
    WatchlistComponent,
    SearchComponent,
    ListsPageComponent,
    ListComponent,
    NewListComponent,
    AddMovieToListComponent,
  ],
  providers: [LoginService, IsLoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
