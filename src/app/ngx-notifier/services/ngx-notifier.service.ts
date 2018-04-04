import { Injectable, Sanitizer } from '@angular/core';

import { Notification } from '../others/notification-helper';
import { NgxNotifierSubscriberService } from './subscriber/ngx-notifier-subscriber.service';

/** Notification Service, recieves notifications from user and interacts with components */
@Injectable()
export class NgxNotifierService {

  constructor(private _ngxNotifierSubscriberService: NgxNotifierSubscriberService) { }

  /** pushes a new notification */
  createToast(message: string, style?: string, duration?: number) {
    this._ngxNotifierSubscriberService.notification.next(new Notification(message, style, duration));
  }

  /** clear all toast notifications */
  clear() {
    this._ngxNotifierSubscriberService.clearToasts.next();
  }

  /** clear last toast notification */
  clearLast() {
    this._ngxNotifierSubscriberService.clearLastToast.next();
  }

}
