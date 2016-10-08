var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('application/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('application/sass/**/*.scss', ['sass']);
});