"use strict";

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    minify = require('gulp-minify'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

/*
 * Directories here
 */

var paths = {
    buildAssets: './assets/',
    prodPages: './app/',
    src: './src/',
    srcScss: './src/styles',
    srcJs: './src/js/',
    buildJs: './assets/js/',
    buildCss: './assets/styles/'
};

/**
 * Compile .twig files.
 */
gulp.task('twig', function () {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src(paths.src + '/template/**/*.twig')
        .pipe(twig({
            data: {
                title: ''
            }
        }))
        .pipe(gulp.dest(paths.prodPages))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Compile .scss files into build css directory then live reload the browser.
 */
gulp.task('sass', function () {
    return gulp.src(paths.src + '/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)

        .pipe(autoprefixer({
            browsers: ['> 1%', 'ie 8-10'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.buildCss))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Concat js libs and move to build
 */

let jsList = [
    paths.src + '/js/libs/*.js',
];

gulp.task('js', function () {
    return gulp.src(jsList)
        .pipe(concat('libs.js'))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(minify())
        .pipe(gulp.dest(paths.buildJs));

});

let mainSrcJs = [
    paths.src + '/js/*.js',
];

gulp.task('js-main', function () {
    return gulp.src(mainSrcJs)
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(minify())
        .pipe(gulp.dest(paths.buildJs))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * Optimize and move images
 */
gulp.task('img', function () {
    return gulp.src(paths.src + '/img/**/*')
        .pipe(imagemin())
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest(paths.buildAssets + 'img'));
});

gulp.task('fonts', function () {
    return gulp.src(paths.src + '/media/fonts/**/*')
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest(paths.buildAssets + 'media/fonts/'));
});

/**
 * Optimize and generate svg sprite
 */
gulp.task('svg', function () {
    return gulp.src(paths.src + '/media/svg/**/*.svg')
        .pipe(imagemin())
        .pipe(svgSymbols({
            templates: ['default-svg']
        }))
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest(paths.buildAssets + 'media/svg/'));
});

/**
 * Watch scss files for changes & recompile
 * Watch .twig files run twig-rebuild then reload BrowserSync
 */

/**
 * Recompile .twig files and live reload the browser
 */
gulp.task('rebuild', gulp.series('twig', 'js-main', 'js', function () {
    browserSync.reload();
}));

/**
 * Wait for twig and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', function (done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false
    });

        gulp.watch('./src/**/*.scss', gulp.series('rebuild'));
        gulp.watch('./src/template/*.twig', gulp.series('rebuild'));
        gulp.watch('./src/**/**/*.js', gulp.series('rebuild'));
    done();
});

// Build task compile sass and twig.
gulp.task('build', gulp.series('sass', 'twig', 'js', 'js-main', 'img', 'fonts'));

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', gulp.series('browser-sync'));
