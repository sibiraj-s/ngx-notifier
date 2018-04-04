import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotifierComponent } from './ngx-notifier.component';
import { NgxNotifierSubscriberService } from './services/subscriber/ngx-notifier-subscriber.service';

describe('NgxNotifierComponent', () => {
  let component: NgxNotifierComponent;
  let fixture: ComponentFixture<NgxNotifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxNotifierComponent],
      providers: [NgxNotifierSubscriberService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
