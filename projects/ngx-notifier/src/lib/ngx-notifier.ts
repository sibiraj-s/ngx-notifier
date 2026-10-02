import { Component, inject, Input, SecurityContext, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { INotification } from './others/notification-helper';

import { NgxNotifierService } from './services/ngx-notifier.service';

/**
 * Notifier compoent, which holds all the notifications can be accessed via `ngx-notifier` selector
 */
@Component({
  selector: 'ngx-notifier',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ngx-notifier.component.html',
  styleUrls: ['./ngx-notifier.scss'],
})
export class NgxNotifier {
  /** whether to allow duplicate messages or not */
  @Input() allowDuplicates = true;
  /** allow HTML in notification */
  @Input() allowHTML = false;
  /** custom class to be attached */
  @Input() className = '';
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

  /** notifications are kept in a signal, so the view is updated without zone.js and with OnPush */
  private readonly notificationsState = signal<INotification[]>([]);

  /** array of notifications */
  get notifications(): INotification[] {
    return this.notificationsState();
  }

  /** class applied while a notification enters */
  get enterAnimation(): string {
    return this.disableAnimations ? '' : 'ngx-n-enter';
  }

  /** class applied while a notification leaves */
  get leaveAnimation(): string {
    return this.disableAnimations ? '' : 'ngx-n-leave';
  }

  /** ids of the notifications in the order they were inserted, oldest first */
  private insertionOrder: string[] = [];

  ngxNotifierService = inject(NgxNotifierService);
  domSanitizer = inject(DomSanitizer);

  constructor() {
    this.ngxNotifierService.notification.pipe(takeUntilDestroyed()).subscribe((notification: INotification) => {
      this.updateNotifications(notification);
    });

    this.ngxNotifierService.clearToasts.pipe(takeUntilDestroyed()).subscribe(() => {
      this.notificationsState.set([]);
    });

    this.ngxNotifierService.clearLastToast.pipe(takeUntilDestroyed()).subscribe(() => {
      this.clearLastToast();
    });
  }

  /**
   * updates notification into the array i.e., Which is the display
   *
   * @param notification notification element
   */
  private updateNotifications(notification: INotification): void {
    // sanitize html if enableHTML is set to true
    const message =
      notification.message && this.allowHTML
        ? (this.domSanitizer.sanitize(SecurityContext.HTML, notification.message) ?? '')
        : notification.message;

    // checks whether the message is alrady present in notifications,
    // stored messages are sanitized so the sanitized message is compared
    const isDuplicate = this.notifications.some((e) => e.message === message);

    if (!this.allowDuplicates && isDuplicate) {
      return;
    }

    const newNotification: INotification = { ...notification, message };

    // insert notification in the first position of the array
    const notifications = this.insertOnTop
      ? [newNotification, ...this.notifications]
      : [...this.notifications, newNotification];

    /**
     * remove the last inserted element if max has
     * pop or shift based on `insertOnTop`
     */
    if (notifications.length > this.max) {
      if (this.insertOnTop) {
        notifications.pop();
      } else {
        notifications.shift();
      }
    }

    this.notificationsState.set(notifications);

    // keep track of the insertion order of the visible notifications
    const visibleIds = new Set(notifications.map((e) => e.id));
    this.insertionOrder = [...this.insertionOrder, newNotification.id].filter((id) => visibleIds.has(id));

    // clear notification in given time
    setTimeout(() => {
      this.removeNotificationById(newNotification.id);
    }, notification.duration || this.duration);
  }

  /**
   * remove the element from the array based on index
   *
   * @param index position of the element
   */
  removeNotification(index: number): void {
    this.notificationsState.update((notifications) => notifications.filter((_, i) => i !== index));
  }

  /**
   * remove the element from the array based on id
   *
   * @param id id of the notification
   */
  private removeNotificationById(id: string): void {
    this.notificationsState.update((notifications) => notifications.filter((e) => e.id !== id));
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
  }

  /**
   * close button handler, the click is not propagated to the toast so that
   * `dismissOnClick` does not remove another notification
   *
   * @param event click event
   * @param id id of the notification
   */
  protected onCloseClick(event: Event, id: string): void {
    event.stopPropagation();
    this.removeNotificationById(id);
  }

  /**
   * toast click handler
   *
   * @param id id of the notification
   */
  protected onToastClickById(id: string): void {
    if (this.dismissOnClick) {
      this.removeNotificationById(id);
    }
  }

  // dummy keyup handler
  onKeyUp(): void {
    // do nothing
  }

  /** clear the most recently inserted notification that is still visible */
  private clearLastToast(): void {
    const visibleIds = new Set(this.notifications.map((e) => e.id));
    const lastId = this.insertionOrder.filter((id) => visibleIds.has(id)).at(-1);

    if (lastId) {
      this.removeNotificationById(lastId);
    }
  }
}
