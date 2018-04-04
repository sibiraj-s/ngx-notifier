import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Notification } from '../../others/notification-helper';

@Injectable()
export class NgxNotifierSubscriberService {

  /** notification which can be subscribed on new messages */
  notification: Subject<Notification> = new Subject<Notification>();
  /** clear all toast notifications */
  clearToasts: Subject<any> = new Subject<any>();
  /** clear last toast notification */
  clearLastToast: Subject<any> = new Subject<any>();

}
