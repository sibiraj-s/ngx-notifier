import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('ngx-editor App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('A Simple Notification Service for Angular Applications.');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
