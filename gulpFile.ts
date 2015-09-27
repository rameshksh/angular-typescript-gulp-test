/// <reference path='./typings/node/node.d.ts' />

var gulp = require('gulp'),
    inject = require('gulp-inject'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    template = require('gulp-template'),
    tsc = require('gulp-typescript'),
    watch = require('gulp-watch'),
    nodemon = require('nodemon'),
    Builder = require('systemjs-builder'),
    del = require('del'),
    fs = require('fs'),
    path = require('path'),
    join = path.join,
    runSequence = require('run-sequence'),

    express = require('express'),
    serveStatic = require('serve-static'),
    openResource = require('open'),
    KarmaServer = require('karma').Server,

    tinylr = require('tiny-lr')(),
    connectLivereload = require('connect-livereload');

// --------------
// Configuration.
var APP_BASE = '/';

var config = {
    PATH: {
        dest: {
            all: 'dist',
            dev: {
                all: 'dist/dev',
                app: 'dist/dev/app',
                lib: 'dist/dev/lib',
                css: 'dist/dev/css',
                ng: 'dist/dev/lib/angular.js',
                route: 'dist/dev/lib/angular-route.js',
                tests: 'dist/dev/tests'
            }
        },
        src: {
            // Order is quite important here for the HTML tag injection.
            lib: [
                './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
                './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
                './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
                './node_modules/reflect-metadata/Reflect.js',
                './node_modules/reflect-metadata/Reflect.js.map',
                './node_modules/systemjs/dist/system.src.js',
                './node_modules/angular2/node_modules/zone.js/dist/zone.js',
                './node_modules/es6-promise/dist/es6-promise',
                './node_modules/jquery/dist/jquery.js',
                './node_modules/jquery/dist/jquery.js.map',
                './node_modules/angular/angular.js',
                './node_modules/angular-ui-router/release/angular-ui-router.js',
                './node_modules/bootstrap/dist/js/bootstrap.js',
                './node_modules/bootstrap/dist/css/bootstrap.css',
                './node_modules/bootstrap/dist/css/bootstrap.css.map'
            ],
            app: ['./app/**/**.ts'],
            tests: ['./tests/**/*Spec.ts']
        }
    },

    PORT: 3000,
    LIVE_RELOAD_PORT: 4002,
       

    HTMLMinifierOpts: { conditionals: true },

    tsProject: tsc.createProject('tsconfig.json', {
        typescript: require('typescript')
    })
};

var utils = {
    getVersion: function () {
        //var pkg = JSON.parse(fs.readFileSync('package.json'));
        return '1.0.0';//pkg.version;
    },

    notifyLiveReload: function (e) {
        var fileName = e.path;
        tinylr.changed({
            body: {
                files: [fileName]
            }
        });
    },

    transformPath: function (env) {
        var v = '?v=' + this.getVersion();
        return function (filepath) {
            var filename = filepath.replace('/' + config.PATH.dest[env].all, '') + v;
            arguments[0] = join(APP_BASE, filename);
            return inject.transform.apply(inject.transform, arguments);
        };
    },

    injectableDevAssetsRef: function () {
        var src = config.PATH.src.lib.map(function (path) {
            return join(config.PATH.dest.dev.lib, path.split('/').pop());
        });

        src.push(config.PATH.dest.dev.ng,
            config.PATH.dest.dev.route,
            join(config.PATH.dest.dev.all, '**/*.css'));

        return src;
    },

    templateLocals: function () {
        return {
            VERSION: this.getVersion(),
            APP_BASE: APP_BASE
        }
    },

    serveSPA: function (env) {
        var app;
        app = express().use(APP_BASE,
            connectLivereload({ port: config.LIVE_RELOAD_PORT }),
            serveStatic(join(__dirname, config.PATH.dest[env].all)));

        app.all(APP_BASE + '*', function (req, res, next) {
            res.sendFile(join(__dirname, config.PATH.dest[env].all, 'index.html'));
        });

        app.listen(config.PORT, function () {
            openResource('http://localhost:' + config.PORT + APP_BASE);
        });
    }
};

// --------------
// Clean.

gulp.task('clean', function (done) {
    del(config.PATH.dest.dev.all, done);
});

// --------------
// Build dev.

gulp.task('build.lib', function () {
    return gulp.src(config.PATH.src.lib)
        .pipe(gulp.dest(config.PATH.dest.dev.lib));
});

gulp.task('build.js', function () {
    var result = gulp.src(['./app/**/**/*.ts', './app/**/*.ts'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(tsc(config.tsProject));

    return result.js
        .pipe(sourcemaps.write())
        .pipe(template(utils.templateLocals()))
        .pipe(gulp.dest(config.PATH.dest.dev.app));
});

gulp.task('build.less', function () {
    return gulp.src('./app/less/*.less')
        .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
    }))
        .pipe(gulp.dest(config.PATH.dest.dev.css));
});

gulp.task('build.assets', ['build.js', 'build.less'], function () {
    return gulp.src(['./app/**/**/*.html', './content/css/*.css'])
        .pipe(gulp.dest(config.PATH.dest.dev.app));
});

gulp.task('build.index', function () {
    var target = gulp.src(utils.injectableDevAssetsRef(), { read: false });
    return gulp.src('./index.html')
        .pipe(inject(target, { transform: utils.transformPath('dev') }))
        .pipe(template(utils.templateLocals()))
        .pipe(gulp.dest(config.PATH.dest.dev.all));
});

gulp.task('build.app', function (done) {
    runSequence('build.assets', 'build.index', done);
});

gulp.task('build', ['clean'] ,  function (done) {
    runSequence('build.lib', 'build.app', done);
});

// Livereload.

gulp.task('livereload', function () {
    tinylr.listen(config.LIVE_RELOAD_PORT);
});

gulp.task('demon', function () {
    nodemon({
        ignore: ['./app/typings',
            './node_modules/',
            './scripts/'
        ]
    })
});

gulp.task('watch', function (cb) {
    watch(['./app/less/**'], function (e) {
        runSequence('build.less', function () {
            utils.notifyLiveReload(e);
        });
    });
    watch(['./app/**'], function (e) {
        runSequence('build.assets', function () {
            utils.notifyLiveReload(e);
        });
    });

    watch(['./tests/**'], function (e) {
        runSequence('build.tests', function () {
            utils.notifyLiveReload(e);
        });
    });

    watch(['./*.ts', './*.html'], function (e) {
        runSequence('build', function () {
            utils.notifyLiveReload(e);
        });
    });
});

// --------------
// Test.
// Test.
// tests
gulp.task('cleanTests', function (done) {
    return del(config.PATH.dest.dev.tests, done);
});

gulp.task('build.tests', function (done) {
    return gulp.src(config.PATH.src.tests)
        .pipe(sourcemaps.init())
        .pipe(tsc(config.tsProject))
        .pipe(sourcemaps.write('/maps', { includeContent: false, sourceRoot: '/' })) //'/maps', { includeContent: false, sourceRoot: '/tests' })
        .pipe(gulp.dest(config.PATH.dest.dev.tests), done);
});

// To be implemented.

// --------------
// Serve dev.
gulp.task('default', ['watch']);

gulp.task('serve', ['clean', 'build', 'livereload'], function () {
    runSequence('default', function (e) {
        utils.notifyLiveReload(e);
    });
    utils.serveSPA('dev');
});

gulp.task('karma', function (done) {
    new KarmaServer({
        configFile: __dirname + '/tests/config/karma.conf.js',
        singleRun: false
    }, done).start();
});

gulp.task("test", function (done) {
    runSequence('cleanTests','build.tests',
        'karma', done);
});

// --------------
