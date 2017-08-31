import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for mini-project', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be mini-project', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('mini-project');
    })
  });

  it('navbar-brand should be my-network@0.1.6',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('my-network@0.1.6');
  });

  
    it('Vehicle component should be loadable',() => {
      page.navigateTo('/Vehicle');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Vehicle');
    });

    it('Vehicle table should have 3 columns',() => {
      page.navigateTo('/Vehicle');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });

  
    it('VehicleListing component should be loadable',() => {
      page.navigateTo('/VehicleListing');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('VehicleListing');
    });

    it('VehicleListing table should have 7 columns',() => {
      page.navigateTo('/VehicleListing');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });

  

});
