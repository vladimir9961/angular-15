import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  accId: number;
  sessId: string;
  api_host = 'https://api.themoviedb.org/3/';
  api_key = '3b5caee89d6f1ccfb03cb837adb8e9e1';
  constructor(private http: HttpClient) {
    this.accId = parseInt(localStorage.getItem('account_id'));
    this.sessId = JSON.parse(localStorage.getItem('session_id'));
  };
  //Checking if Movie/Tv exist in favorite list
  checkInFavorite(TYPE_OF_FETCHED_DATA) {
    return this.http.get(`${this.api_host}account/${this.accId}/favorite/${TYPE_OF_FETCHED_DATA}?api_key=${this.api_key}&session_id=${this.sessId}&language=en-US&sort_by=created_at.asc&page=1`)
  };
  //Gets called on click add's or removes movie/tv from favorite list
  add_or_remove_favorite(TYPE_OF_FETCHED_DATA, IdOfItem, itemExists) {
    if (TYPE_OF_FETCHED_DATA === "movies") {
      TYPE_OF_FETCHED_DATA = "movie"
    }
    let media = {
      media_type: TYPE_OF_FETCHED_DATA,
      media_id: IdOfItem,
      favorite: !itemExists
    }
    return this.http.post(`${this.api_host}account/${this.accId}/favorite?api_key=${this.api_key}&session_id=${this.sessId}`, media)
  };
  //Checking if Movie/Tv exist in watchlist list
  checkInWatchlist(TYPE_OF_FETCHED_DATA) {
    return this.http.get(`${this.api_host}account/${this.accId}/watchlist/${TYPE_OF_FETCHED_DATA}?api_key=${this.api_key}&session_id=${this.sessId}&language=en-US&sort_by=created_at.asc&page=1`)
  };
  //Gets called on click add's or removes movie/tv from favorite list
  add_or_remove_watchlist(TYPE_OF_FETCHED_DATA, IdOfItem, itemExists) {
    if (TYPE_OF_FETCHED_DATA === "movies") {
      TYPE_OF_FETCHED_DATA = "movie"
    }
    let media = {
      media_type: TYPE_OF_FETCHED_DATA,
      media_id: IdOfItem,
      watchlist: !itemExists
    }
    return this.http.post(`${this.api_host}account/${this.accId}/watchlist?api_key=${this.api_key}&session_id=${this.sessId}`, media)
  };
  //Get lists created by user
  createLists() {
    return this.http.get(`${this.api_host}account/${this.accId}/lists?api_key=${this.api_key}&session_id=${this.sessId}`)
  }
  add_to_list(listId, movieId) {
    let toList = {
      media_id: movieId
    }
    return this.http.post(`${this.api_host}list/${listId}/add_item?api_key=${this.api_key}&session_id=${this.sessId}`, toList)
  }
  //Get rated movies
  getAllRatedMovies(type) {
    return this.http.get(`${this.api_host}account/${this.accId}/rated/${type}?api_key=${this.api_key}&language=en-US&session_id=${this.sessId}&sort_by=created_at.asc&page=1`)
  }
  //User rated movie/tv
  on_rate_change(id, value, type) {
    if (type === "movies") {
      type = "movie"
    }
    let rate_value = {
      "value": value
    }
    return this.http.post(`${this.api_host}${type}/${id}/rating?api_key=${this.api_key}&session_id=${this.sessId}`, rate_value)
  }
  //User deleted rate
  delete_rate(id, type) {
    if (type === "movies") {
      type = "movie"
    }
    return this.http.delete(`${this.api_host}${type}/${id}/rating?api_key=${this.api_key}&session_id=${this.sessId}`)
  }
}
