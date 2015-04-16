var gulp = require('gulp');
var elixir = require('laravel-elixir');
var PEG = require('pegjs');
var fs = require('fs');
var source = require('vinyl-source-stream');
var map = require('vinyl-map');

elixir.extend('pegjs', function(src, dest) {
	gulp.task('pegjs', function() {
		fs.createReadStream(src)
		  .pipe(source('parser.js'))
		  .pipe(map(function(code, filename) {
		  	var code = code.toString();
		  	return 'module.exports=' + PEG.buildParser(code, {
		  		output: 'source'
		  	});
		  }))
		  .pipe(gulp.dest(dest));
	});

	this.registerWatcher('pegjs', '**/*.pegjs');

	return this.queueTask('pegjs');
});