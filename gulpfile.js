const gulp = require('gulp');

const htmlLint = require('gulp-htmllint');
const cssLint = require('gulp-stylelint');
const jsLint = require('gulp-eslint');

gulp.task('htmlLint', function() {
  return gulp.src('src/index.html')
      .pipe(htmlLint());
});

gulp.task('cssLint', function() {
  return gulp.src('src/css/*.css')
      .pipe(cssLint({
        reporters: [{formatter: 'string', console: true}],
      }));
});

gulp.task('jsLint', function() {
  return gulp.src('src/js/*.js')
      .pipe(jsLint())
      .pipe(jsLint.format());
});

gulp.task('lint', gulp.parallel(
    'htmlLint',
    'cssLint',
    'jsLint'
));
