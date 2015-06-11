import CalculatorForm from './CalculatorForm'
import CalculatorResult from './CalculatorResult'
import CalculatorError from './CalculatorError'
import VariableInput from './VariableInput'

import Parser from '../dist/parser'
import Parsertools from '../dist/parsertools'
import React from 'react/addons'

var Calculator = React.createClass({
	getInitialState() {
		return {
			term: '',
			errorInterval: null,
			error: null,
			visibleTabIndex: 0
		}
	},

	onTermChange(newTerm) {
		if (newTerm == '') {
			return;
		}
		try {
			var resError = Parser.parse(newTerm);
			resError = Parsertools.convVal(resError);
			this.setState({
				error: null,
				errorInterval: resError,
				visibleTabIndex: 1
			});
			
		} catch (err) {
			this.setState({
				errorInterval: null,
				error: err,
				visibleTabIndex: 1
			});
			// this.setState({error: err});
		}
	},

	activateTab(tabId, e) {
		this.setState({
			visibleTabIndex: tabId
		});
		e.preventDefault();
	},

	render() {
		// var cx = React.addons.classSet;
		// var classes = cx({
		// 	'inputfield': true,
		// 	'has-success': this.state.errorInterval !== null,
		// 	'has-error': this.state.error !== null
		// });
		return (
			<div className="new-ui">
				<div className="col-md-12 well">
					<div className={(this.state.error !== null) ? "has-error": ""}>
						<CalculatorForm onChange={this.onTermChange} initialTerm={this.state.term} />
					</div>
					<div className={(this.state.visibleTabIndex == 0) ? "variables-tab tab" : "variables-tab hide"}>
						<VariableInput />
					</div>
					<div className={(this.state.visibleTabIndex == 1) ? "results-tab tab" : "results-tab hide"}>
						<h4>Ergebnis</h4>
						<CalculatorResult errorInterval={this.state.errorInterval} />
						<CalculatorError error={this.state.error} />
					</div>
					<ul className="nav nav-tabs">
						<li className={(this.state.visibleTabIndex == 0) ? "active" : ""}><a href="#" onClick={this.activateTab.bind(this, 0)}>Variablen</a></li>
						<li className={(this.state.visibleTabIndex == 1) ? "active" : ""}><a href="#" onClick={this.activateTab.bind(this, 1)}>Ergebnis</a></li>
					</ul>
				</div>
			</div>);
	}
});

export default Calculator;