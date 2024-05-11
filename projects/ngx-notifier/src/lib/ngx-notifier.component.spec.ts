import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotifierComponent } from './ngx-notifier.component';

describe('NgxNotifierComponent', () => {
  let component: NgxNotifierComponent;
  let fixture: ComponentFixture<NgxNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxNotifierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
