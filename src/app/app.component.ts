import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { NgxNotifierService } from './ngx-notifier/services/ngx-notifier.service';
import { AppService } from './app.service';
import { jsonArray } from './data';

/** App Component is the root component of the application */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'A Simple Notification Service for Angular 5+ Applications.';
  jsonArray = jsonArray;
  latestRelease: any = [];
  private subscription: Subject<any> = new Subject();

  constructor(private _appService: AppService,
    private _ngxNotifierService: NgxNotifierService) { }

  private getLatestRelease() {
    this.subscription = this._appService.getLatestRelease().subscribe(
      data => this.latestRelease = data,
      error => { console.log(error); },
      () => {
        console.log('latest release: ' + this.latestRelease['name']);
        this.subscription.unsubscribe();
      });
  }

  /** crates a toast message */
  createToast(style: string): void {
    this._ngxNotifierService.createToast(this.jsonArray[Math.floor(Math.random() * this.jsonArray.length)], style);
    return;
  }

  /** clears all toast messages */
  clearToasts() {
    this._ngxNotifierService.clear();
  }

  ngOnInit() {
    this.getLatestRelease();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
