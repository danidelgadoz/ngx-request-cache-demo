import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieModule } from './movie/movie.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RequestCacheInterceptor, RequestCacheService } from 'ngx-request-cache';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MovieModule,
    MaterialModule,
  ],
  providers: [
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestCacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
