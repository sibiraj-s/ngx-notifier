import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Notification } from '../others/notification-helper';

/** Notification Service, recieves notifications from user and interacts with components */
@Injectable()
export class NgxNotifierService {

  /** notification which can be subscribed on new messages */
  notification: Subject<Notification> = new Subject<Notification>();
  /** clear all toast notifications */
  clearToasts: Subject<any> = new Subject<any>();
  /** clear last toast notification */
  clearLastToast: Subject<any> = new Subject<any>();

  /** pushes a new notification */
  createToast(message: string, style?: string, duration?: number) {
    this.notification.next(new Notification(message, style, duration));
  }

  /** clear all toast notifications */
  clear() {
    this.clearToasts.next();
  }

  /** clear last toast notification */
  clearLast() {
    this.clearLastToast.next();
  }

}
