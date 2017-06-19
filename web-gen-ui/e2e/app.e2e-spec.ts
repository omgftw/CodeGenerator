import { WebGenUiPage } from './app.po';

describe('web-gen-ui App', () => {
  let page: WebGenUiPage;

  beforeEach(() => {
    page = new WebGenUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
