import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
//custom added
   // get header
   getHeader(): ElementFinder {
    return element(by.css('mat-toolbar'));
  }
  // check header is present or not
  isHeaderPresent(): promise.Promise<boolean> {
    return this.getHeader().isPresent();
  }
}
