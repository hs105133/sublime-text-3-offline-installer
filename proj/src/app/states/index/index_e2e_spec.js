 /* jshint -W030 */
 var chai = require('chai');
 var chaiAsPromised = require('chai-as-promised');
 chai.use(chaiAsPromised);
 var expect = chai.expect;
 var users = require(require('path').resolve('config/users.conf'));

 var ptor = protractor.getInstance();

 describe('Homepage End-to-End Test', function () {
   before(function () {
    browser.manage().deleteAllCookies();
    browser.get('/#/');

    var u = users('staff');
    console.log('Waiting on login page...', u.username, u.password);

    var rg = new RegExp('aamc.org/30/ssoLogin');
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        console.log(url);
        console.log(rg.test(url));

        browser.manage().logs().get('browser').then(function(browserLogs) {
           // browserLogs is an array of objects with level and message fields
           browserLogs.forEach(function(log){
                console.log(log.message);
           });
        });

        return rg.test(url);
      });
    }).then(function() {

      browser.driver.wait(function () {
          return ptor.driver.isElementPresent(by.id('loginForm'));
        })
        .then(function (i) {
          console.log('Form found.');
          console.log('Logging in...', u.username, u.password);
          var uname = browser.driver.findElement(by.id('user.username'));
          uname.click();
          uname.sendKeys(u.username);
          var pword = browser.driver.findElement(by.id('userSecurity.password'));
          pword.click();
          pword.sendKeys(u.password);
          var submitButton = browser.driver.findElement(by.id('submitButton'));
          submitButton.click();
          console.log('Form submitted. Waiting for redirect...');

          // Make sure the cookie is set.
          console.log('Waiting for cookie to be set...');
          browser.wait(function() {
            return browser.manage().getCookie('iPlanetDirectoryPro');
          });

        });
    });
   });

   it('should redirect to SSO Login page', function () {
    expect(ptor.manage().getCookie('iPlanetDirectoryPro')).to.eventually.not.be.empty;
   });

   it('should load the AAMC Angular Bootsrap homepage', function () {
      var rg = new RegExp(':9999/');
      ptor.wait(function() {
        return ptor.driver.getCurrentUrl().then(function(url) {
          return rg.test(url);
        });
      });
   });

   it('should have a navbar', function () {
     expect($('#head-nav')).to.eventually.be.ok;
   });

   it('should have a brand on the navbar', function () {
     ptor.driver.takeScreenshot().then(function(data) {
      var fs = require('fs');
      var stream = fs.createWriteStream("coverage/home.png");

      stream.write(new Buffer(data, 'base64'));
      stream.end();
     });
     expect($('h1').getText()).to.eventually.contain('AAMC UI Demo Application');
   });
 });