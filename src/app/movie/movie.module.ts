import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from './movie.service';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [MovieListComponent],
  providers: [MovieService]
})
export class MovieModule { }
