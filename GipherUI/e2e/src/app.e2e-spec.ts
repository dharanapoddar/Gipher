import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should check header presentation on home page', () => {
    page.navigateTo();
    expect(page.isHeaderPresent()).toBeTruthy('<mat-toolbar> should exist in header.component.html');
  });
});
