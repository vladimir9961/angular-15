import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PagesService {
  apiHost = 'https://api.themoviedb.org/3/';
  apiKey = '3b5caee89d6f1ccfb03cb837adb8e9e1'
  constructor(private http: HttpClient) { }
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
}
