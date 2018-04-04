import { TestBed, inject } from '@angular/core/testing';

import { NgxNotifierSubscriberService } from './ngx-notifier-subscriber.service';

describe('NgxNotifierSubscriberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxNotifierSubscriberService]
    });
  });

  it('should be created', inject([NgxNotifierSubscriberService], (service: NgxNotifierSubscriberService) => {
    expect(service).toBeTruthy();
  }));
});
