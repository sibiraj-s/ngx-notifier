import { TestBed, inject } from '@angular/core/testing';

import { NgxNotifierService } from './ngx-notifier.service';

describe('NgxNotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxNotifierService]
    });
  });

  it('should be created', inject([NgxNotifierService], (service: NgxNotifierService) => {
    expect(service).toBeTruthy();
  }));
});
