import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { INotification } from './others/notification-helper';

import { NgxNotifierService } from './services/ngx-notifier.service';

/**
 * Notifier compoent, which holds all the notifications can be accessed via `app-ngx-notifier` selector
 */
@Component({
  selector: 'app-ngx-notifier',
  templateUrl: './ngx-notifier.component.html',
  styleUrls: ['./ngx-notifier.component.scss']
})

export class NgxNotifierComponent implements OnDestroy {

  private componentDestroyed$: Subject<boolean> = new Subject();

  /** whether to allow duplicate messages or not */
  @Input() allowDuplicates = true;
  /** custom class to be attached */
  @Input() className: string;
  /** default duration for dismissing notifications (60s/1minute) */
  @Input() duration = 60000;
  /** click to dismiss a notification */
  @Input() dismissOnClick = false;
  /** whether to insert on top or at bottom */
  @Input() insertOnTop = true;
  /** Maximum number of notifications to keep */
  @Input() max = 5;

  /** array of notifications */
  notifications: INotification[] = [];

  /** id of last inserted message */
  lastInsertedNotificationId: string;

  /**
   * NgxNotifierComponent Constructor
   *
   * @param _ngxNotifierService Notifier Service
   */
  constructor(private _ngxNotifierService: NgxNotifierService) {

    this._ngxNotifierService.notification.takeUntil(this.componentDestroyed$)
      .subscribe((notification: INotification) => { this.updateNotifications(notification); });

    this._ngxNotifierService.clearToasts.takeUntil(this.componentDestroyed$).subscribe(() => { this.notifications = []; });

    this._ngxNotifierService.clearLastToast.takeUntil(this.componentDestroyed$).subscribe(() => { this.clearLastToast(); });
  }

  /**
   * updates notification into the array i.e., Which is the display
   *
   * @param notification notification element
   */
  private updateNotifications(notification: INotification) {

    // checks whether the message is alrady present in notifications
    const index = this.notifications.map(function (e) { return e.message; }).indexOf(notification.message);

    if (!this.allowDuplicates) {
      if (index !== -1) {
        return;
      }
    }

    // save the last inserted Id
    this.lastInsertedNotificationId = notification.id;
    // insert notification in the first position of the array
    if (this.insertOnTop) {
      this.notifications.unshift(notification);
    } else {
      this.notifications.push(notification);
    }

    /**
     * remove the last inserted element if max has
     * pop or shift based on `insertOnTop`
     */
    if (this.notifications.length > this.max) {
      if (this.insertOnTop) {
        this.notifications.pop();
      } else {
        this.notifications.shift();
      }
    }

    // clear notification in given time
    setTimeout(() => {
      this.notifications.splice(index, 1);
    }, notification.duration || this.duration);

  }

  /**
   * remove the element from the array based on index
   *
   * @param index position of the element
   */
  removeNotification(index: number): void {
    this.notifications.splice(index, 1);
    return;
  }

  /** clear last inserted toast notification */
  private clearLastToast() {
    const index = this.notifications.map(function (e) { return e.id; }).indexOf(this.lastInsertedNotificationId);

    if (this.notifications.length !== 0 && index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  /** stop subscription when component is destroyed */
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
