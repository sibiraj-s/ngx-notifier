import { TestBed, inject } from '@angular/core/testing';

import { NgxNotifierService } from './ngx-notifier.service';
import { NgxNotifierSubscriberService } from './subscriber/ngx-notifier-subscriber.service';

describe('NgxNotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxNotifierService, NgxNotifierSubscriberService]
    });
  });

  it('should be created', inject([NgxNotifierService], (service: NgxNotifierService) => {
    expect(service).toBeTruthy();
  }));
});
