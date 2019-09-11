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
  'src/js/audio/audioEffects.js',
  'src/js/player/spriteSheet.js',
  'src/js/enemy/sprite.js',
  'src/js/enemy/position.js',
  'src/js/enemy/timer.js',
  'src/js/player/playerUtil.js',
  'src/js/player/player.js',
  'src/js/font/font.js',
  'src/js/ui/userInterface.js',
  'src/js/collision/collisionDetection.js',
  'src/js/enemy/animationHelper.js',
  'src/js/enemy/bulletSpeed.js',
  'src/js/enemy/bulletPattern.js',
  'src/js/enemy/bulletAnimationHelper.js',
  'src/js/enemy/bullet.js',
  'src/js/enemy/enemyAnimationHelper.js',
  'src/js/enemy/enemy.js',
  'src/js/enemy/level.js',
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
  return gulp.src('src/js/**/*.js')
      .pipe(concat('main.js'))
      .pipe(jsLint())
      .pipe(jsLint.format());
});

gulp.task('jsLintNoConcat', function() {
  return gulp.src('src/js/**/*.js')
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

gulp.task('jsfxr', function() {
  console.log('Added jsfxr to build!');

  return gulp.src('src/jsfxr/jsfxr.min.js', {allowEmpty: true})
      .pipe(gulp.dest('build/jsfxr/'));
});

gulp.task('watch', function() {
  console.log('Now Watching!');
  gulp.watch('src/index.html', gulp.series('htmlLint', 'htmlBuild'));
  gulp.watch('src/css/*.css', gulp.series('cssLint', 'cssBuild'));
  gulp.watch('src/js/**/*.js', gulp.series('jsLint', 'jsBuild'));
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
    'jsfxr',
    'imageMin',
    'zip'
));
