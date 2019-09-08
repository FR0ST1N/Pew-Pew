const gulp = require('gulp');

const htmlLint = require('gulp-htmllint');
const cssLint = require('gulp-stylelint');
const jsLint = require('gulp-eslint');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const cssMin = require('gulp-clean-css');
const jsMin = require('gulp-minify');
const zip = require('gulp-zip');
const rimraf = require('gulp-rimraf');
const checkSize = require('gulp-check-filesize');
const imageMin = require('gulp-imagemin');

const jsConcat = [
  'src/js/sprite_sheet.js',
  'src/js/position.js',
  'src/js/sprite.js',
  'src/js/timer.js',
  'src/js/animationHelper.js',
  'src/js/enemyAnimationHelper.js',
  'src/js/bulletSpeed.js',
  'src/js/bulletPattern.js',
  'src/js/bullet.js',
  'src/js/enemy.js',
  'src/js/player.js',
  'src/js/game.js',
  'src/js/main.js',
];

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
      .pipe(concat('main.js'))
      .pipe(jsLint())
      .pipe(jsLint.format());
});

gulp.task('jsLintNoConcat', function() {
  return gulp.src('src/js/*.js')
      .pipe(jsLint())
      .pipe(jsLint.format());
});

gulp.task('htmlBuild', function() {
  return gulp.src('src/index.html')
      .pipe(htmlMin({
        collapseWhitespace: true,
        removeComments: true,
        html5: true,
      }))
      .pipe(gulp.dest('build'));
});

gulp.task('cssBuild', function() {
  return gulp.src('src/css/*.css')
      .pipe(concat('style.min.css'))
      .pipe(cssMin())
      .pipe(gulp.dest('build/css'));
});

gulp.task('jsBuild', function() {
  return gulp.src(jsConcat, {allowEmpty: true})
      .pipe(concat('main.js'))
      .pipe(jsMin({
        noSource: true,
        ext: {
          min: '.min.js',
        },
      }))
      .pipe(gulp.dest('build/js'));
});

gulp.task('imageMin', function() {
  return gulp.src('src/images/*')
      .pipe(imageMin({optimizationLevel: 5}))
      .pipe(gulp.dest('build/images'));
});

gulp.task('clean', function() {
  return gulp.src(['build/*', 'zip/*'], {read: false})
      .pipe(rimraf());
});

gulp.task('zip', function() {
  const maxSize = 1024 * 13;

  return gulp.src('build/**')
      .pipe(zip('PewPew.zip'))
      .pipe(gulp.dest('zip'))
      .pipe(checkSize({fileSizeLimit: maxSize}));
});

gulp.task('watch', function() {
  console.log('Now Watching!');
  gulp.watch('src/index.html', gulp.series('htmlLint', 'htmlBuild'));
  gulp.watch('src/css/*.css', gulp.series('cssLint', 'cssBuild'));
  gulp.watch('src/js/*.js', gulp.series('jsLint', 'jsBuild'));
  gulp.watch('src/images/*', gulp.series('imageMin'));
});

gulp.task('lint', gulp.parallel(
    'htmlLint',
    'cssLint',
    'jsLint'
));

gulp.task('build', gulp.series(
    'lint',
    'clean',
    'htmlBuild',
    'cssBuild',
    'jsBuild',
    'imageMin',
    'zip'
));
