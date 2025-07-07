import { Component, inject, ViewEncapsulation } from '@angular/core';

import { NgxNotifier, NgxNotifierService } from 'ngx-notifier';
import { jsonArray } from './data';

/** App Component is the root component of the application */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxNotifier],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None,
})

export class App {
  title = 'A Simple Notification Service for Angular Applications.';
  jsonArray = jsonArray;
  ngxNotifierService = inject(NgxNotifierService);

  /** crates a toast message */
  createToast(style: string): void {
    this.ngxNotifierService.createToast(this.jsonArray[Math.floor(Math.random() * this.jsonArray.length)], style);
  }

  /** clears all toast messages */
  clearToasts(): void {
    this.ngxNotifierService.clear();
  }

  /** clear last toast notification */
  clearLastToast(): void {
    this.ngxNotifierService.clearLast();
  }
}
