var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {
    return browserify('./src/index.js', {
        debug: true,
        transform: [reactify]
    })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['browserify']);
});
