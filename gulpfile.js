'use strict';

const { src, dest, watch, series } = require('gulp');
const browsersync = require('browser-sync').create();
const terser = require('gulp-terser');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');

// BrowserSync

function browsersyncServe(cb){
    browsersync.init({
      server: {
        baseDir: '.'
      }    
    });
    cb();
  }

  function browsersyncReload(cb){
    browsersync.reload();
    cb();
  }

// Sass Task
function scssTask(){    
    return src('src/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask(){
    return src('src/app.js', { sourcemaps: true })
      .pipe(terser())
      .pipe(dest('dist', { sourcemaps: '.' }));
  }

  // Watch Task
function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['src/**/*.scss', 'src/**/*.js'], series(jsTask, scssTask, browsersyncReload));
  }

  exports.default = series(
    browsersyncServe,
    watchTask,
    scssTask
  );
