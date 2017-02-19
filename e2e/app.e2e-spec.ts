import { Admin.UmmahBooks.Com.NgPage } from './app.po';

describe('admin.ummah-books.com.ng App', () => {
  let page: Admin.UmmahBooks.Com.NgPage;

  beforeEach(() => {
    page = new Admin.UmmahBooks.Com.NgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
