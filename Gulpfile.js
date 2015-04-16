var elixir = require('laravel-elixir');
require('./elixir-pegjs');

elixir.config.assetsDir = '';
elixir.config.publicDir = '';

elixir(function(mix) {
	mix.coffee('', 'dist').pegjs('parser.pegjs', 'dist/');
});