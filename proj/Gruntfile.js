module.exports = function(grunt) {

    /** 
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var buildConfig = require('./build.config.js');

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        //Banner that is added to build files    
        meta: {
            banner: '/**\n' + ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + ' * <%= pkg.homepage %>\n' + ' *\n' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.organization %>\n' + ' */\n'
        },

        //Clean these directories
        clean: [
            'docs',
            '<%= tmp_dir %>',
            '<%= dist_dir %>',
            'coverage'
        ],

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload: {
                    key: grunt.file.read('ssl/angular-bootstrap.pem'),
                    cert: grunt.file.read('ssl/angular-bootstrap-cert.pem')
                }
            },
            js: {
                files: ['<%= app_files.js %>'],
                tasks: ['jshint:src', 'karma:unit']
            },
            jsunit: {
                files: [
                    '<%= app_files.jsunit %>'
                ],
                tasks: ['jshint:test', 'karma:unit'],
                options: {
                    livereload: false
                }
            },
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:compile']
            },
            html2js: {
                files: ['src/app/**/*.html'],
                tasks: ['html2js']
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/{,*/}*.html',
                    '<%= tmp_dir %>/styles/{,*/}*.css',
                    'src/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        //create css from the less files
        less: {
            compile: {
                options: {
                    optimization: 2
                },
                files: {
                    '<%= tmp_dir %>/assets/<%= pkg.name %>.css': '<%= app_files.less %>'
                }
            }
        },

        //Creates JS files out of the HTML js files.
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.atpl %>'],
                dest: '<%= tmp_dir %>/templates-app.js'
            }
        },

        //JsHint Files
        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= app_files.jsunit %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: '<%= dist_dir %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= dist_dir %>/{,*/}*.html'],
            css: ['<%= dist_dir %>/assets/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= dist_dir %>', '<%= dist_dir %>/assets'],
                patterns: {
                    js: [
                        [/(images\/[^.]+\.(jpg|png))/g, 'Replacing dynamic images']
                    ]
                },
                blockReplacements: {
                    context: function(block) {
                        return '<base href="' + block.dest + '"/>';
                    }
                }

            }
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= dist_dir %>/scripts/{,*/}*.js',
                        '<%= dist_dir %>/assets/{,*/}*.css',
                        '<%= dist_dir %>/fonts/*'
                    ]
                }
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [{
                    expand: true,
                    src: '<%= tmp_dir%>/concat/scripts/*.js'
                }]
            }
        },


        //Connect Server that can be used to sever files         
        connect: {
            options: {
                hostname: '*',
                protocol: 'https',
                port: 8443
            },
            dev: {
                options: {
                    base: ['<%= tmp_dir %>', 'src'],
                    debug: true,
                    livereload: true,
                    middleware: function(connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                },
                proxies: [{
                    context: '/30/config-service/services-rs/config',
                    host: 'apps.development.aamc.org',
                    https: true,
                    port: 443,
                    changeOrigin: true
                    // rewrite: {
                    //     '^/30/config-service': '/config-service'
                    // }
                }]
            },
            standalone: {
                options: {
                    base: '<%=dist_dir %>',
                    debug: false,
                    keepalive: true,
                    middleware: function(connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                },
                proxies: [{
                    context: '/30/config-service/services-rs/config',
                    host: 'apps.development.aamc.org',
                    https: true,
                    port: 443,
                    changeOrigin: true
                }]
            },
            testserver: {
                options: {
                    base: '<%=dist_dir %>',
                    port: 9999,
                    debug: true,
                    middleware: function(connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                },
                proxies: [{
                    context: '/30/config-service/services-rs/config',
                    host: 'apps.development.aamc.org',
                    https: true,
                    port: 443,
                    changeOrigin: true
                }]
            }
        },


        //Code documentation generator         
        jsdoc: {
            dist: {
                src: [
                    'src/**/*.js',
                    'src/*.md',
                    'src/**/*.md',
                    '!src/vendor/**/*.js',
                    '!src/vendor/**/*.md'
                ],
                dest: 'docs'
            }
        },

        //Bower Install         
        wiredep: {
            target: {
                src: ['src/index.html']
            }
        },

        //Copy Tasks
        copy: {
            vendor_font: {
                files: [{
                    src: ['<%= vendor_files.fonts %>'],
                    dest: '<%= tmp_dir %>/fonts/',
                    flatten: true,
                    cwd: '.',
                    expand: true
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: '<%= dist_dir %>',
                    src: ['*.html']
                }, {
                    dest: '<%= dist_dir %>',
                    cwd: '<%= tmp_dir %>',
                    expand: true,
                    src: [

                        'fonts/*'
                    ]
                }]
            }
        },

        // Karama Unit Test Configuration
        karma: {
            options: {
                configFile: 'config/karma.conf.js',
                // list of files / patterns to load in the browser                
                files: ['<%= vendor_files.js %>', 'src/app/app.js', '<%= test_files.js %>', '<%= app_files.js %>'],
                // list of files to exclude
                exclude: [
                    'src/assets/**/*.js',
                    'src/assets/**/*.js',
                    'src/**/*e2e_spec.js',
                    'src/app/main.js',
                    '**/Gruntfile.js'
                ]
            },
            unit: {
                browsers: ['PhantomJS']
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            build: ['less:compile', 'copy:vendor_font', 'html2js', 'jshint']
        }
    };
    grunt.initConfig(grunt.util._.extend(taskConfig, buildConfig));

    grunt.registerTask('server', function() {
        console.log('Starting API Server on port 8081');
        require('./server.js').listen(8081);
    });

    grunt.registerTask('build', [
        'clean',
        'wiredep',
        'concurrent:build',
        'karma'
    ]);

    grunt.registerTask('serve', [
        'build',
        'configureProxies:dev',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('dist', [
        'build',
        'useminPrepare',
        'concat',
        'copy:dist',
        'ngAnnotate',
        'uglify',
        'cssmin',
        'rev',
        'usemin',
        'jsdoc'
    ]);

    grunt.registerTask('serve-dist', [
        'dist',
        'configureProxies:standalone',
        'connect:standalone'
    ]);

    grunt.registerTask('default', [
        'dist'
    ]);
};
