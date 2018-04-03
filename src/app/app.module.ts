import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgxNotifierModule } from './ngx-notifier/ngx-notifier.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxNotifierModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
