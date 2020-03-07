(function(){
    var r=require;
    require=function (n){
        try{
            return r(n)
        }
        catch(e){
            r('child_process').exec('npm i ' + n,function (err,body){
                try{
                    console.log('Module "' +n + '"" not found, installing.\n' + body )
                    return r(n);
                }
                catch(e){
                }
            })
        }
    }
    console.log('""Please re-run gulp.\n' + body ) 
})()


var gulp=require("gulp");
var jshint=require('gulp-jshint');
var clean=require('gulp-clean');
var uglfy=require('gulp-uglyfy');
var concat=require('gulp-concat');
var htmlmin=require('gulp-htmlmin');
var cssmin=require('gulp-clean-css');
var runSQ=require('run-sequence')

gulp.task('clean', function () {
    gulp.src('dest/').pipe(clean())
});

gulp.task('jshint',function () {
        return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('concat', function() {
    gulp.src('vendor/**/*.js')
    .pipe(uglfy())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dest/js'));
});
gulp.task('htmlmin',function () {
    return gulp.src('/*.html')
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dist('dest/')) ;
});

gulp.task('cssmin',function () {
    return gulp.src('vendor/**/*.css','css/**/*.css').pipe(cssmin()).pipe('styles.min.css')
    .pipe(gulp.dest('dest/css/'))
})
 gulp.task('default',function (cd) {
     return runSequence('clean',['jshint','cssmin','htmlmin'])
 })
