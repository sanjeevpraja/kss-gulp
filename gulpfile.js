var gulp = require('gulp');
var gulpless = require('gulp-less');
var gulpkss = require('gulp-kss');
var gulpconcat = require('gulp-concat');


gulp.task('kss', function() {
    // Generate styleguide with templates 
    return gulp.src(['styles/**/*.less'])
    .pipe(gulpkss({
    	overview: __dirname + '/styles/styleguide.md',
    	templateDirectory:  __dirname + '/template/'
    }))
    .pipe(gulp.dest('styleguide/'));
});

gulp.task('render', function() {
     // Concat and compile all your styles for correct rendering of the styleguide. 
     return gulp.src('styles/main.less')
     .pipe(gulpless())
     .pipe(gulpconcat('public/style.css'))
     .pipe(gulp.dest('styleguide/'));
 });






gulp.task('default',['kss', 'render'], function() {
    // content
});