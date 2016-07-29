var gulp = require('gulp');
var gulpless = require('gulp-less');
var gulpkss = require('gulp-kss');
var gulpconcat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

var onError = function (err) {  
    console.log(err);
    this.emit('end');
};

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });

gulp.task('kss', function() {
    // Generate styleguide with templates 
    return gulp.src(['styles/**/*.less'])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(gulpkss({
    	overview: __dirname + '/styles/styleguide.md',
    	templateDirectory:  __dirname + '/template/'
    }))
    .pipe(gulp.dest('styleguide/'))
    .pipe(browserSync.stream());
});

gulp.task('render', function() {
     // Concat and compile all your styles for correct rendering of the styleguide. 
     return gulp.src('styles/**/*.less')
     .pipe(gulpless())
     .pipe(gulpconcat('public/style.css'))
     .pipe(gulp.dest('styleguide/'))
     .pipe(browserSync.stream());
 });



gulp.task('watch', function() {
 browserSync.init({
    server: "./styleguide/"
});
 gulp.watch('styles/styleguide.md', ['kss']);
 gulp.watch('styles/*.less', ['render']);
});


gulp.task('default',['kss', 'render'], function() {
    // content
});