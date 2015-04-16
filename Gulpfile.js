var elixir = require('laravel-elixir');
require('./elixir-pegjs');

elixir.config.assetsDir = '';
elixir.config.publicDir = '';

elixir(function(mix) {
	mix.less('less/app.less', 'web/css').coffee('', 'dist').browserify('index.js', 'web/js', 'dist').pegjs('parser.pegjs', 'dist/');
});