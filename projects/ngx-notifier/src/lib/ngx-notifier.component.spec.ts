import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxNotifierComponent } from './ngx-notifier.component';
import { NgxNotifierService } from './services/ngx-notifier.service';

describe('NgxNotifierComponent', () => {
  let component: NgxNotifierComponent;
  let fixture: ComponentFixture<NgxNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [NgxNotifierComponent],
      providers: [NgxNotifierService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
