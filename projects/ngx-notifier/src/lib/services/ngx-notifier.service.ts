import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Notification } from '../others/notification-helper';

/** Notification Service, recieves notifications from user and interacts with components */
@Injectable()
export class NgxNotifierService {
  /** notification which can be subscribed on new messages */
  notification: Subject<Notification> = new Subject<Notification>();
  /** clear all toast notifications */
  clearToasts: Subject<void> = new Subject();
  /** clear last toast notification */
  clearLastToast: Subject<void> = new Subject();

  /** pushes a new notification */
  createToast(message: string, style?: string, duration?: number): void {
    this.notification.next(new Notification(message, style, duration));
  }

  /** clear all toast notifications */
  clear(): void {
    this.clearToasts.next();
  }

  /** clear last toast notification */
  clearLast(): void {
    this.clearLastToast.next();
  }
}
