import { TestBed } from '@angular/core/testing';

import { NgxNotifierService } from './ngx-notifier.service';
import { Notification } from '../others/notification-helper';

describe('NgxNotifierService', () => {
  let service: NgxNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('emits a notification with the given values', () => {
    const emitted: Notification[] = [];
    service.notification.subscribe((notification) => emitted.push(notification));

    service.createToast('message', 'success', 1000);

    expect(emitted).toHaveLength(1);
    expect(emitted[0]).toBeInstanceOf(Notification);
    expect(emitted[0]).toMatchObject({ message: 'message', style: 'success', duration: 1000 });
  });

  it('emits a notification with default values', () => {
    const emitted: Notification[] = [];
    service.notification.subscribe((notification) => emitted.push(notification));

    service.createToast('message');

    expect(emitted[0]).toMatchObject({ message: 'message', style: 'info', duration: undefined });
  });

  it('emits when clearing all toasts', () => {
    const clear = vi.fn();
    service.clearToasts.subscribe(clear);

    service.clear();

    expect(clear).toHaveBeenCalledOnce();
  });

  it('emits when clearing the last toast', () => {
    const clearLast = vi.fn();
    service.clearLastToast.subscribe(clearLast);

    service.clearLast();

    expect(clearLast).toHaveBeenCalledOnce();
  });
});
