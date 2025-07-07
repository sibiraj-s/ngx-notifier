import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotifier } from './ngx-notifier';

describe('NgxNotifier', () => {
  let component: NgxNotifier;
  let fixture: ComponentFixture<NgxNotifier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxNotifier],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxNotifier);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
