import { Component, Input, OnDestroy, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { INotification } from './others/notification-helper';

import { NgxNotifierService } from './services/ngx-notifier.service';

/**
 * Notifier compoent, which holds all the notifications can be accessed via `app-ngx-notifier` selector
 */
@Component({
  selector: 'ngx-notifier',
  templateUrl: './ngx-notifier.component.html',
  styleUrls: ['./ngx-notifier.component.scss'],
  animations: [
    trigger('animateToasts', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [ // void <=> *
        animate('0.3s ease')
      ])
    ])
  ]
})

export class NgxNotifierComponent implements OnDestroy {
  private componentDestroyed$: Subject<boolean> = new Subject();

  /** whether to allow duplicate messages or not */
  @Input() allowDuplicates = true;
  /** allow HTML in notification */
  @Input() allowHTML = false;
  /** custom class to be attached */
  @Input() className: string;
  /** default duration for dismissing notifications (60s/1minute) */
  @Input() duration = 60000;
  /** weather to enable or disable animations */
  @Input() disableAnimations = false;
  /** click to dismiss a notification */
  @Input() dismissOnClick = false;
  /** whether to insert on top or at bottom */
  @Input() insertOnTop = true;
  /** Maximum number of notifications to keep */
  @Input() max = 5;

  /** array of notifications */
  notifications: INotification[] = [];

  /** id of last inserted message */
  private lastInsertedNotificationId: string;

  /**
   * NgxNotifierComponent Constructor
   *
   * @param ngxNotifierService subscribe to get values form notifier service
   */
  constructor(private ngxNotifierService: NgxNotifierService, private domSanitizer: DomSanitizer) {
    this.ngxNotifierService.notification.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((notification: INotification) => { this.updateNotifications(notification); });

    this.ngxNotifierService.clearToasts.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => { this.notifications = []; });

    this.ngxNotifierService.clearLastToast.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => { this.clearLastToast(); });
  }

  /**
   * updates notification into the array i.e., Which is the display
   *
   * @param notification notification element
   */
  private updateNotifications(notification: INotification): void {
    // checks whether the message is alrady present in notifications
    const index = this.notifications.map((e) => e.message).indexOf(notification.message);

    if (!this.allowDuplicates) {
      if (index !== -1) {
        return;
      }
    }

    // save the last inserted Id
    this.lastInsertedNotificationId = notification.id;

    // sanitize html if enableHTML is set to true
    let sanitizedMessage: string;
    if (notification.message && this.allowHTML) {
      sanitizedMessage = this.domSanitizer.sanitize(SecurityContext.HTML, notification.message);
    }
    // set sanitized output to notification message
    notification.message = sanitizedMessage || notification.message;

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

    return;
  }

  /**
   * remove the element from the array based on index
   *
   * @param index position of the element
   */
  removeNotification(index: number): void {
    if (index !== undefined || index !== null) {
      this.notifications.splice(index, 1);
    }
    return;
  }

  /**
   * click event when toast is cleared
   *
   * @param index position of the element
   */
  onToastClick(index: number): void {
    if (this.dismissOnClick) {
      this.removeNotification(index);
    }
    return;
  }

  /** clear last inserted toast notification */
  private clearLastToast(): void {
    const index = this.notifications.map((e) => e.id).indexOf(this.lastInsertedNotificationId);

    if (this.notifications.length !== 0 && index !== -1) {
      this.notifications.splice(index, 1);
    }
    return;
  }

  /** stop subscription when component is destroyed */
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
