import { TestBed } from '@angular/core/testing';

import { NgxNotifierService } from './ngx-notifier.service';

describe('NgxNotifierService', () => {
  let service: NgxNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
