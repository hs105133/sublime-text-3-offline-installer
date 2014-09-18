/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    dist_dir: 'bin',
    tmp_dir: '.tmp',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `atpl` contains
     * our template HTML files, `html` is just our main HTML file, `less` is 
     * our main stylesheet, and `unit` contains our app's unit tests.
     */
    app_files: {
        js: ['src/app/**/*.js'],
        jsunit: ['src/app/**/*_spec.js'],
        atpl: ['src/app/**/*.html'],
        html: ['src/index.html'],
        less: 'src/less/main.less',
        json: ['env.json']
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
        js: [
            'src/vendor/angular-mocks/angular-mocks.js',
            'mocks/templates.js',
            'src/app/components/**/*.html'
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: [
            'src/vendor/angular/angular.js',
            'src/vendor/jquery/dist/jquery.min.js',
            'src/vendor/bootstrap/dist/js/bootstrap.min.js',
            'src/vendor/angular-ui-router/release/angular-ui-router.js',
            'src/vendor/angular-ui-utils/modules/route/route.js',
            'src/vendor/lodash/dist/lodash.min.js',
            'src/vendor/aamc-components/dist/aamc-components-templates.js',
            'src/vendor/aamc-components/dist/aamc-components.min.js',
            'src/vendor/angular-strap/dist/angular-strap.min.js',
            'src/vendor/angular-strap/dist/angular-strap.tpl.min.js'
        ],
        css: [],
        assets: [],
        fonts: [
            'src/vendor/font-awesome/fonts/*',
            'src/vendor/bootstrap/dist/fonts/*'
        ]
    }
};
