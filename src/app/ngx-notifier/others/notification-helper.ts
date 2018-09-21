import { SafeHtml } from '@angular/platform-browser';

/** Notification Class */
export class Notification {

  /** unique id for each notification */
  id: string;
  /** message to be shown */
  message: string;
  /** bootstrap background colors */
  style: string;
  /** timeout for notification */
  duration: number;

  /**
   * Constructor For Notification
   *
   * @param message message to be shown
   * @param style bootstrap background colors
   * @param duration timeout for notification
   */
  constructor(message: string, style?: string, duration?: number) {
    this.id = '_' + Math.random().toString(36).substr(2, 9); // generate a random number
    this.message = message;
    this.style = style || 'info';
    this.duration = duration;
  }
}

/** INotification interface */
export interface INotification {
  /** unique id for each notification */
  id: string;
  /** message to be shown */
  message: string | SafeHtml;
  /** bootstrap background colors */
  style?: string;
  /** timeout for notification */
  duration?: number;
}
