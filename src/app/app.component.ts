import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestCacheService } from 'ngx-request-cache';
import { MovieService } from './movie/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private snackBar: MatSnackBar,
    public movieService: MovieService,
    private requestCacheService: RequestCacheService,
  ) {}

  ngOnInit(): void {
    if (this.movieService.isCacheEnabled) {
      this.openCacheEnabledSnackbar();
    }
  }

  onToggleChange(e: MatSlideToggleChange) {
    this.movieService.isCacheEnabled = e.checked;

    if (e.checked) {
      this.openCacheEnabledSnackbar();
    } else {
      this.openCacheClearedSnackbar();
    }
  }

  onClearCache() {
    this.requestCacheService.clear();
    this.openCacheClearedSnackbar();
  }

  private openCacheEnabledSnackbar(): void {
    this.snackBar.open(`Watch devtools's network tab to see library behavior`, '', { duration: 10000 });
  }

  private openCacheClearedSnackbar(): void {
    this.snackBar.open(`Cache cleared`, '', { duration: 3000 });
  }


}
