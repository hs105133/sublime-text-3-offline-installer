/* jshint -W030 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var options = {
  url: '/wizard'
  /* To switch roles for this page, set the options below
   * username: 'username',
   * password: 'password'
   */
};
var page = require('../../../../mocks/e2e/page')(options);

describe('wizard Page', function() {
  page.get();

  beforeEach(function() {
  });

  //Write tests here
  it('should have a sample test', function() {
    expect(true).to.be.ok;
  });

});
