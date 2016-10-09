var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('clean:public', function() {
    return del.sync('public');
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        },
    })
})

gulp.task('html', function() {
    return gulp.src('application/**/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('sass', function() {
    return gulp.src('application/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/styles'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('script', function() {
    return gulp.src('application/scripts/**/*.js')
        .pipe(gulp.dest('public/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('vendor', function() {
    return gulp.src('application/vendor/**/*.js')
        .pipe(gulp.dest('public/vendor'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('useref', function() {
    return gulp.src('application/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('public'))
});

gulp.task('images', function() {
    return gulp.src('application/assets/images/**/*.+(png|jpg|gif|svg)')
        .pipe(gulp.dest('public/assets/images'))
});

gulp.task('fonts', function() {
    return gulp.src('application/assets/fonts/**/*')
        .pipe(gulp.dest('public/assets/fonts'))
})

gulp.task('watch', ['browserSync', 'html', 'sass', 'script', 'vendor', 'useref', 'images', 'fonts'], function() {
    gulp.watch('application/sass/**/*.scss', ['sass']);
    gulp.watch('application/*.html', browserSync.reload);
    gulp.watch('application/scripts/**/*.js', browserSync.reload);
    gulp.watch('application/vendor/**/*.js', browserSync.reload);
});

gulp.task('build', function(callback) {
    runSequence('clean:public', ['html', 'sass', 'script', 'vendor', 'useref', 'images', 'fonts'],
        callback
    )
})

gulp.task('default', function(callback) {
    runSequence(['build', 'browserSync', 'watch'],
        callback
    )
})