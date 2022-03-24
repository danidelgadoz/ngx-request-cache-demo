import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  list(pageIndex: number): Observable<Paginator<Movie>> {
    let params = new HttpParams();
    params = params.append('api_key', '3661411c65331184ac73d8660d0b4648');
    params = params.append('language', 'en-US');
    params = params.append('page', String(pageIndex + 1));

    return this.http.get<Paginator<Movie>>(`${movieDBHost}/movie/now_playing`, { params })
      .pipe(
        map(response => {
          response.page = response.page - 1;
          return response;
        })
      );
  }

}
