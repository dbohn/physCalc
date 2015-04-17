var elixir = require('laravel-elixir');
require('./elixir-pegjs');

elixir.config.assetsDir = '';
elixir.config.publicDir = '';

elixir(function(mix) {
	mix.less('less/app.less', 'web/css')
	   .pegjs('parser.pegjs', 'dist/')
	   .coffee('', 'dist')
	   .browserify('index.js', 'web/js', 'dist')
	   .copy('bower_components/bootstrap/fonts','web/fonts');
});