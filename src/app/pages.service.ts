import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PagesService {
  accId: number;
  sessId: string;
  apiHost = 'https://api.themoviedb.org/3/';
  apiKey = '3b5caee89d6f1ccfb03cb837adb8e9e1'
  constructor(private http: HttpClient) {
    this.accId = parseInt(localStorage.getItem('account_id'));
    this.sessId = JSON.parse(localStorage.getItem('session_id'));
  }
  //Home Page
  getDataHomePage(tvOrMovies, type) {
    return this.http.get(`${this.apiHost}${tvOrMovies}/${type}?api_key=${this.apiKey}&language=en-US`)
  }
  //Display page
  getDataDisplayPage(id, type) {
    return this.http.get(`${this.apiHost}${type}/${id}?api_key=${this.apiKey}&language=en-US`)
  }
  getSimilar(id, type) {
    return this.http.get(`${this.apiHost}${type}/${id}/similar?api_key=${this.apiKey}&language=en-US&page=1`)
  }
  getCrewAndCast(id, type) {
    return this.http.get(`${this.apiHost}${type}/${id}/credits?api_key=${this.apiKey}&language=en-US`)
  }
  //Movie/TV pages
  getMoviesOrTvs(type, value, page) {
    return this.http.get(`${this.apiHost}${type}/${value}?api_key=${this.apiKey}&language=en-US&page=${page}`)
  }
  //Get genres
  getGenres(type) {
    return this.http.get(`${this.apiHost}genre/${type}/list?api_key=${this.apiKey}&language=en-US`)
  }
  //Filter options
  getData(...filter) {
    return this.http.get(`${this.apiHost}discover/${filter[0].type}?api_key=${this.apiKey}&sort_by=${filter[0].sort_by}&include_adult=false&include_video=false&page=${filter[0].pagination}&primary_release_date.gte=${filter[0].date_from}&primary_release_date.lte=${filter[0].date_to}&vote_count.lte=${filter[0].user_vote}&vote_average.gte=${filter[0].user_score_left}&vote_average.lte=${filter[0].user_score_right}&with_genres=${filter[0].genres}&with_runtime.gte=${filter[0].runtime_left}&with_runtime.lte=${filter[0].runtime_right}`)
  }
  //Watchlist
  getWatchlist(type) {
    return this.http.get(`${this.apiHost}account/${this.accId}/watchlist/${type}?api_key=${this.apiKey}&language=en-US&session_id=${this.sessId}&sort_by=created_at.asc&page=1`)
  }
}
