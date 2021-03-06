//Gulpfile.js

// Common
var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');

// S/CSS variables
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

// JS variables
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// Pug
var pug = require('gulp-pug');

// Source locations
var dirSass_In = 'src/scss/**/*.scss';
var dirCSS_Out = 'css/';
var dirJS_In = 'src/js/**/*.js';
var dirJS_Out = 'js/';
var dirPug_In = 'src/pug/**/*.pug';
var dirPug_Out = '.';

// S/CSS task
gulp.task('styles', function() {
  gulp.src(dirSass_In)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dirCSS_Out))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(dirCSS_Out));
});

// JS task
gulp.task('scripts', function() {
  gulp.src(dirJS_In)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(dirJS_Out))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(dirJS_Out));
});

// Pug task
gulp.task('views', function() {
  gulp.src(dirPug_In)
    .pipe(plumber())
    .pipe(pug({
      //options
    }))
    .pipe(gulp.dest(dirPug_Out));
});

//TODO: Add SVG minify task

// Watch
gulp.task('default', function() {
  livereload.listen();
  gulp.watch(dirSass_In, ['styles']);
  gulp.watch(dirJS_In, ['scripts']);
  gulp.watch(dirPug_In, ['views']);
});
