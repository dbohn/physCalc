import React from 'react/addons'

import Parser from '../dist/parser'
import Parsertools from '../dist/parsertools'

var CalculatorError = React.createClass({

	convertFound(found) {
		if (found == null) {
			return 'nichts';
		}

		return '"' + found + '"';
	},

	connectList(list) {
		if (list.length == 1) {
			return this.stringifyItem(list[0]);
		}
		return list.slice(0, list.length - 1).map(this.stringifyItem).join(", ") + ' oder ' + this.stringifyItem(list[list.length - 1])
	},

	stringifyItem(item) {
		if (item.type == 'end') {
			return 'das Eingabeende';
		} else {
			return item.description;
		}
	},

	decodeError(err) {
		if (err === null) {
			return {
				title: '',
				info: ''
			}
		}

		if (err instanceof Parser.SyntaxError) {
			console.log(err);
			var desc = 'Es wurde ' + this.connectList(err.expected) + ' erwartet. Gefunden wurde aber ' + this.convertFound(err.found) + '.';
			return {
				title: 'Der Ausdruck enthält einen syntaktische Fehler an Position ' + err.column + '!',
				info: desc
			}
		} else if (err instanceof Parsertools.UnknownIdentifierError) {
			return {
				title: 'Die Variable "' + err.identifier + '" wurde nicht definiert!',
				info: 'Bei der Berechnung wurde ein unbekannter Bezeichner gefunden. Die Berechnung wird abgebrochen.'
			};
		} else if (err == 'Exponent must not have error') {
			return {
				title: 'Der absolute Fehler des Exponenten muss 0 sein!',
				info: 'Dies liegt an den Grenzen der zugrunde liegenden Fehlerfortpflanzung.'
			}
		} else {
			console.log(err);
			return {
				title: 'Ein unbekannter Fehler ist aufgetreten!',
				info: ''
			}
		}
	},

	render() {
		var cx = React.addons.classSet;
		var classes = cx({
			'row': true,
			'error_container': true,
			'hide': this.props.error === null
		});

		var e = this.decodeError(this.props.error);

		return (
			<div className={classes}>
				<div className="col-md-12">
					<h2 className="error">{e.title}</h2>
					<p className="infotext">{e.info}</p>
				</div>
			</div>)
	}
});

export default CalculatorError;