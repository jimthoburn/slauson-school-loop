// https://github.com/gulpjs/gulp

var gulp = require('gulp');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var cssimport    = require('postcss-import');
var customprops  = require('postcss-custom-properties');
var calc         = require("postcss-calc");
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();

var paths = {
  css: '../_css/*'
};

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe( sourcemaps.init() )
    .pipe(postcss([
      cssimport(),
      customprops(),
      calc(),
      autoprefixer()
    ]))
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('../css/') );
});

gulp.task('browser-sync', function() {
  browserSync.watch("../_site/css/*.css", function (event, file) {
    if (event === "change") {
      browserSync.reload(["*.css"]);
    }
  });

  browserSync.init({
    server: {
      baseDir: "../_site"
    },
    open: false,
    notify: false
  });
});

// Rerun the CSS task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'css', 'browser-sync']);
