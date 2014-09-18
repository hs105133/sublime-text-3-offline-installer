// Karma configuration
// Generated on Thu Mar 06 2014 13:17:21 GMT-0500 (Eastern Standard Time)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files to exclude
    exclude: [
      'src/assets/**/*.js',
      'src/**/*e2e_spec.js',
      'src/app/main.js',
      '**/Gruntfile.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage', 'junit'],
    coverageReporter: {
        reporters: [{
            type: 'html'
        }, {
            type: 'text-summary'
        }],
        dir: 'coverage/'
    },
    junitReporter: {
        outputFile: 'coverage/test-results.xml'
    },
    preprocessors: {
        'src/app/**/!(*_spec|*_test).js': 'coverage',
        'src/app/components/**/*.html': 'html2js'
    },

    ngHtml2JsPreprocessor: {
        stripPrefix: 'src/app/'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 10000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
