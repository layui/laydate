/**
 layDate构建
*/

var pkg = require('./package.json');

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var header = require('gulp-header');
var del = require('del');

//发行版本目录
var releaseDir = './release/zip/layDate-v' + pkg.version;
var release = releaseDir + '/laydate';

var task = {
  laydate: function() {
    gulp.src('./src/**/*.css')
    .pipe(minify({
      compatibility: 'ie7'
    }))
    .pipe(header('/*! <%= pkg.realname %>-v<%= pkg.version %> <%= pkg.description %> <%= pkg.license %> License  <%= pkg.homepage %>  By <%= pkg.author %> */\n', {pkg: pkg}))
    .pipe(gulp.dest('./dist'));
    
    return gulp.src('./src/laydate.js').pipe(uglify())
     .pipe(header('/*! <%= pkg.realname %>-v<%= pkg.version %> <%= pkg.description %> <%= pkg.license %> License  <%= pkg.homepage %>  By <%= pkg.author %> */\n ;', {pkg: pkg}))
    .pipe(gulp.dest('./dist'));
    
  }
  ,other: function(){
    gulp.src('./src/**/font/*').pipe(rename({}))
    .pipe(gulp.dest('./dist'));
  }
};


gulp.task('clear', function(cb){ //清理
  return del(['./dist/*'], cb);
});
gulp.task('laydate', task.minjs); //压缩PC版本
gulp.task('other', task.other); //移动一些配件

//打包发行版
gulp.task('clearZip', function(cb){ //清理
  return del(['./release/zip/*'], cb);
});
gulp.task('r', ['clearZip'], function(){
  gulp.src('./release/doc/**/*')
  .pipe(gulp.dest(releaseDir))
  
  return gulp.src('./dist/**/*')
  .pipe(gulp.dest(releaseDir + '/laydate'))
});

//全部
gulp.task('default', ['clear'], function(){
  for(var key in task){
    task[key]();
  }
});






