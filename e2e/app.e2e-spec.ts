import { AppPage } from './app.po';

describe('ngx-notifier App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('A Simple Notification Service for Angular 5+ Applications.');
  });
});
