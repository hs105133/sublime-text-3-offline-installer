// var aamcCov = require('./aamc-cov.js');

exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',

  chromeOnly: false,

  // Additional command line options to pass to selenium. For example,
  // if you need to change the browser timeout, use
  // seleniumArgs: ['-browserTimeout=60'],
  seleniumArgs: [],

  allScriptsTimeout: 11000,

  // ----- What tests to run -----
  //
  // Spec patterns are relative to the location of this config.
  specs: [
    '../src/app/states/**/*_e2e_spec.js',
  ],

  exclude: [],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'firefox'
  },

  // multiCapabilities: [{
  //   'browserName': 'firefox'
  // }, {
  //   'browserName': 'chrome',
  //   'chromeOptions': {
  //       'args': ['incognito', 'disable-extensions', 'start-maximized', 'enable-crash-reporter-for-testing']
  //   },
  //   'loggingPrefs': {
  //     'browser': 'ALL'
  //   }
  // }, {
  //   'browserName': 'phantomjs',
  //   'phantomjs.binary.path': '../../phantomjs/lib/phantom/phantomjs.exe',
  //   'phantomjs.cli.args':['--ignore-ssl-errors=true', '--web-security=false', '--ssl-protocol=any']
  // }],

  rootElement: 'html',

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: null,

  onPrepare: function() {},

  framework: 'mocha',

  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec'
  },

  onCleanUp: function() {}
};
