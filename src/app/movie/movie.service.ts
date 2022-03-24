import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestCacheHeader } from 'ngx-request-cache';

import { Movie } from './movie.model';

export interface Paginator<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

const movieDBHost = 'https://api.themoviedb.org/3';
@Injectable()
export class MovieService {
  private _isCacheEnabled = true;

  constructor(private http: HttpClient) { }

  public get isCacheEnabled() {
    return this._isCacheEnabled;
  }
  public set isCacheEnabled(value) {
    this._isCacheEnabled = value;
  }

  list(pageIndex: number): Observable<Paginator<Movie>> {
    let params = new HttpParams();
    params = params.append('api_key', '3661411c65331184ac73d8660d0b4648');
    params = params.append('language', 'en-US');
    params = params.append('page', String(pageIndex + 1));

    let headers = new HttpHeaders();
    if (this._isCacheEnabled) {
      headers = headers.append(RequestCacheHeader.Cachable, '');
    }

    return this.http.get<Paginator<Movie>>(`${movieDBHost}/movie/now_playing`, { params, headers })
      .pipe(
        map(response => {
          response.page = response.page - 1;
          return response;
        })
      );
  }

}
