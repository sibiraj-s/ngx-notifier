/** Notification Class */
export class Notification {

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
        this.message = message;
        this.style = style || 'info';
        this.duration = duration;
    }
}

/** INotification interface */
export interface INotification {
    /** message to be shown */
    message: string;
    /** bootstrap background colors */
    style?: string;
    /** timeout for notification */
    duration?: number;
}
