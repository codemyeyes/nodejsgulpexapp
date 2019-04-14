const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Point tofiles to use
    gulp.dest - Point to folder to output
    gulp.watch - Watch files and folders for changes
*/

// Log Message
gulp.task('msg', function () {
    return new Promise(function(resolve, reject) {
        console.log('Gulp is running......');
        resolve();
    });
});

// Copy All HTML files
gulp.task('copyHtml', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Minify JS
gulp.task('minify', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// gulp.task('default', ['msg','copyHtml','imageMin','minify','sass']);
gulp.task('default', gulp.parallel('msg','copyHtml','imageMin','minify','sass'));

gulp.task('watch', function () {
    gulp.watch('src/js/*.js', gulp.series('minify'));
    gulp.watch('src/images/*.js', gulp.series('imageMin'));
    gulp.watch('src/sass/*.js', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
});