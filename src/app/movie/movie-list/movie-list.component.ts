import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';

import { Movie } from '../../movie/movie.model';
import { MovieService } from '../../movie/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Movie>();
  displayedColumns: string[] = [
    'title',
    'overview',
    'popularity',
    'vote_average',
    'release_date',
  ];
  isLoadingResults = false;

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadMovies();
  }

  loadMovies(pageEvent?: PageEvent) {
    const pageIndex = pageEvent ? pageEvent.pageIndex : 0;
    this.isLoadingResults = true;

    this.movieService
      .list(pageIndex)
      .pipe(finalize(() => this.isLoadingResults = false))
      .subscribe((data) => {
        this.dataSource.data = data.results;

        setTimeout(() => {
          if (this.dataSource.paginator) {
            this.dataSource.paginator.length = data.total_results;
            this.dataSource.paginator.pageIndex = data.page;
            this.dataSource.paginator.pageSize = 20;
          }
        });
      });
  }

}
