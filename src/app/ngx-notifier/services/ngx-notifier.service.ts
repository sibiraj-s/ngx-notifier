import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Notification, INotification } from '../others/notification-helper';

/** Notification Service, recieves notifications from user and interacts with components */
@Injectable()
export class NgxNotifierService {

  /** notification which can be subscribed on new messages */
  notification: Subject<Notification> = new Subject<Notification>();

  /** pushes a new notification */
  createToast(message: string, style?: string, duration?: number) {
    this.notification.next(new Notification(message, style, duration));
  }

}
