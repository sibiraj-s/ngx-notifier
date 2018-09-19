import { Component } from '@angular/core';

import { NgxNotifierService } from './ngx-notifier/services/ngx-notifier.service';
import { jsonArray } from './data';

/** App Component is the root component of the application */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'A Simple Notification Service for Angular 5+ Applications.';
  jsonArray = jsonArray;

  constructor(private _ngxNotifierService: NgxNotifierService) { }

  /** crates a toast message */
  createToast(style: string): void {
    this._ngxNotifierService.createToast(this.jsonArray[Math.floor(Math.random() * this.jsonArray.length)], style);
    return;
  }

  /** clears all toast messages */
  clearToasts() {
    this._ngxNotifierService.clear();
  }

  /** clear last toast notification */
  clearLastToast() {
    this._ngxNotifierService.clearLast();
  }

}
