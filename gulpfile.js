var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var path = require('path');
var gzip = require('gulp-gzip');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wrapJS = require('gulp-wrap-js');
var sourcemaps = require('gulp-sourcemaps');
var original = require('./original/bower.json');

gulp.task('default', ['build', 'fixbowerjson']);

gulp.task('build', ['clean'], function () {
	return gulp
		.src(original.main.map(x=> path.join('./original', x)))
		.pipe(require('gulp-print')())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(concat('draw2d.bundle.js'))
		.pipe(wrapJS(fs.readFileSync('wrapper.jsx', 'utf-8')))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('.', { includeContent: true }))
//		.pipe(gulpif(f=> path.extname(f.path) === '.map', gzip({ gzipOptions: { level: 5 } })))
		.pipe(gulp.dest('dist'));

});

gulp.task('fixbowerjson', function() {
	var t = JSON.parse(JSON.stringify(original));
	t.main = 'dist/draw2d.bundle.js';
	(t.authors = t.authors||[]).push('moander <moander@outlook.com>');
	t.license = 'MIT';
	t.name = 'draw2d-bundle';	
	t.ignore = ['**/*','!dist/'];
	t.moduleType = [
    		'amd',
    		'globals',
    		'node'
  	];
	fs.writeFileSync('bower.json', JSON.stringify(t, null, 2));

});

gulp.task('clean', function () {
	return del([
		'dist/',
	]);
});
