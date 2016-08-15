var gulp         = require('gulp');
var sass         = require('gulp-sass');
var scsslint     = require('gulp-scss-lint');
var nano         = require('gulp-cssnano');
var shell        = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var deploy       = require('gulp-gh-pages');

// Compile SCSS into CSS, sourcemaps, autoprefixer, cssnano + auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('scss/main.scss')
  .pipe(sass({
    includePaths: [
      "./node_modules/ibm-design-colors",
      "./node_modules/modularscale-sass/stylesheets",
      "./node_modules/@whitewater/rapid/styles"
    ]
  }))
  .pipe(autoprefixer())
  .pipe(nano({discardComments: {removeAll: true}}))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

// Pipe index.html to dist
gulp.task('build', function() {
  return gulp.src('index.html')
  .pipe(gulp.dest('dist/'));
});

// Start a local server with browser-sync + watch for changes
gulp.task('serve', ['sass', 'build'], function() {
    browserSync.init({
        server: { baseDir: 'dist/' }
    });

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch(['**/*.html'], ['build']);
    gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

// Run sass, local-build, and serve
gulp.task('default', ['serve']);

// Deploy _site to gh-pages
gulp.task('deploy-gh-pages', function () {
  return gulp.src('./dist/**/*')
    .pipe(deploy())
});

// Run production-build, and deploy-gh-pages
gulp.task('deploy', ['deploy-gh-pages']);
