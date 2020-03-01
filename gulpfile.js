var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

//SASS
gulp.task('sass', function() {
    return gulp.src(['web/sass/layout.sass','web/sass/main.sass', 'web/sass/wave.sass'])
        .pipe(sass())
        .pipe(gulp.dest('web/pre-css'))
});
//Bootstrap
gulp.task('bootstrap', function() {
    return gulp.src('web/sass/customBootstrap.scss')
        .pipe(sass())
        .pipe(gulp.dest('web/pre-css'))
});

gulp.task('compress-images', function() {
    gulp.src('web/pre-images/**/*')
        .pipe(imagemin({ optimizationLevel: 7 }))
        .pipe(gulp.dest('web/images'));
});

//Fonts
gulp.task('fonts', function() {
    return gulp.src('~font-awesome/fonts/**.*')
        .pipe(gulp.dest('web/fonts'))
});

//Minify CSS
gulp.task('cssnano', function() {
    gulp.src(['web/pre-css/*.css', './node_modules/aos/dist/aos.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCss({ discardComments: { removeAll: true } }))
        .pipe(gulp.dest('web/css'));
});

//Minify Js
gulp.task('compress', function() {
    gulp.src(['web/pre-js/*.js', './node_modules/aos/dist/aos.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('web/js'))
})

//BrowserSync
gulp.task('browserSync', function() {
    browserSync.init(["css/*.css"], {
        server: {
            baseDir: 'web'
        }
    });
});

//BrowserSync All files
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('web/sass/**/*.{sass,scss}', ['sass']);
    gulp.watch('web/sass/*.scss', ['bootstrap']);
    gulp.watch('web/pre-css/*.css', ['cssnano']);
    gulp.watch('web/pre-js/*.js', ['compress']);
    gulp.watch('web/pre-images/*', ['compress-images']);
    gulp.watch('web/css/*.css').on('change', browserSync.reload);
    gulp.watch('web/js/*.js').on('change', browserSync.reload);
    gulp.watch('web/fonts/**.*').on('change', browserSync.reload);
    gulp.watch('web/*.html').on('change', browserSync.reload);
})