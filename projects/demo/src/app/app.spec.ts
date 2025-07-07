import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title \'A Simple Notification Service for Angular Applications\'', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('A Simple Notification Service for Angular Applications.');
  });
});
