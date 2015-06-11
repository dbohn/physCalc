import CalculatorForm from './CalculatorForm'
import CalculatorResult from './CalculatorResult'
import CalculatorError from './CalculatorError'

import Parser from '../dist/parser'
import Parsertools from '../dist/parsertools'
import React from 'react/addons'

Parsertools.addVariable("U", Parsertools.create(5,10))

var Calculator = React.createClass({
	getInitialState() {
		return {
			term: '',
			errorInterval: null,
			error: null
		}
	},

	onTermChange(newTerm) {
		if (newTerm == '') {
			return;
		}
		try {
			var resError = Parser.parse(newTerm);
			resError = Parsertools.convVal(resError);
			this.setState({ error: null });
			this.setState({errorInterval: resError});
		} catch (err) {
			this.setState({errorInterval: null});
			this.setState({error: err});
		}
	},

	render() {
		var cx = React.addons.classSet;
		var classes = cx({
			'inputfield': true,
			'has-success': this.state.errorInterval !== null,
			'has-error': this.state.error !== null
		});
		return (<div>
				<h1>Fehlerrechner</h1>
				<div className={classes}>
					<CalculatorForm onChange={this.onTermChange} initialTerm={this.state.term} />
					<CalculatorResult errorInterval={this.state.errorInterval} />
					<CalculatorError error={this.state.error} />
				</div>
			</div>)
	}
});

export default Calculator;