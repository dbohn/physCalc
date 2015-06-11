import React from 'react/addons'

import Parsertools from '../dist/parsertools'

function toLetters(num) {
    "use strict";
    var mod = num % 26;
    var pow = num / 26 | 0;
    var out = mod ? String.fromCharCode(64 + mod) : (pow--, 'Z');
    return pow ? toLetters(pow) + out : out;
}

var counter = 1;

var VariableInput = React.createClass({
	getInitialState() {
		return {
			counter: 0,
			variables: []
		}
	},

	addVar(e) {
		name = toLetters(counter++);

		while (Parsertools.variableExists(name)) {
			name = toLetters(counter++);
		}

		var newVar = {
			type: "errorvalue",
			name: name,
			median: 0.0,
			radius: 0.0
		};

		this.setState({
			variables: this.state.variables.concat([
			newVar])
		});

		this.updateOrAddVar(newVar);

		e.preventDefault();
	},

	removeVar(variable, e) {
		var varname = this.state.variables[variable].name;
		var newData = this.state.variables.slice(); //copy array
    	newData.splice(variable, 1); //remove element
    	this.setState({variables: newData}); //update state

    	Parsertools.removeVariable(varname);

    	e.preventDefault();
	},

	changeName(i, e) {
		var newName = e.target.value;
		var cpy = this.state.variables.slice();

		Parsertools.removeVariable(cpy[i].name);

		cpy[i].name = newName;
		this.setState({
			variables: cpy
		});

		this.updateOrAddVar(cpy[i]);
	},

	changeMedian(i, e) {
		var newMedian = e.target.value;
		var cpy = this.state.variables.slice();

		cpy[i].median = newMedian;

		this.setState({
			variables: cpy
		});

		this.updateOrAddVar(cpy[i]);
	},

	changeRadius(i, e) {
		var newRadius = e.target.value;
		var cpy = this.state.variables.slice();

		cpy[i].radius = newRadius;

		this.setState({
			variables: cpy
		});

		this.updateOrAddVar(cpy[i]);
	},

	changePercentage(i, e) {
		var newPercentage = e.target.value;
		var cpy = this.state.variables.slice();

		cpy[i].percentage = newPercentage;

		this.setState({
			variables: cpy
		});

		this.updateOrAddVar(cpy[i]);
	},

	changeDigit(i, e) {
		var newDigit = e.target.value;
		var cpy = this.state.variables.slice();

		cpy[i].digit = newDigit;

		this.setState({
			variables: cpy
		});

		this.updateOrAddVar(cpy[i]);
	},

	updateOrAddVar(varfield) {
		var name = varfield.name, median = varfield.median;
		if (varfield.type == "errorvalue") {
			var radiand = varfield.radius;
			Parsertools.addVariable(name, Parsertools.createNamed(median, radiand, name));
		} else if (varfield.type == "digitvalue") {
			var converted = Parsertools.createFromDigital(median, varfield.percentage, varfield.digit, name);
			Parsertools.addVariable(name, converted);
		}
	},

	changeType(variable, i, e) {
		var newType = e.target.value;
		var cpy = this.state.variables.slice();


		var newEntry = {
			name: cpy[i].name,
			type: newType
		};

		if (newType == "digitvalue") {
			newEntry.median = 0.0;
			newEntry.percentage = 0.0;
			newEntry.digit = 0;
		} else {
			newEntry.median = 0.0;
			newEntry.radius = 0.0;
		}

		cpy[i] = newEntry;

		this.setState({ variables: cpy });

		this.updateOrAddVar(cpy[i]);
	},

	renderTypeSelector(variable, i) {
		return (<div className="col-md-2">
								<select className="form-control" onChange={this.changeType.bind(this, variable, i)} defaultValue={variable.type}>
									<option value="errorvalue">Fehlerwert</option>
									<option value="digitvalue">Digitalwert</option>
								</select>
							</div>);
	},

	renderErrorValue(variable, i) {
		return (
			<div className="form-group varrow" key={i}>
				{this.renderTypeSelector(variable, i)}
				<div className="col-md-9 varinput">
					<input type="text" onChange={this.changeName.bind(this, i)} className="form-control" placeholder="Name" value={variable.name} />
					<span className="separator">=</span>
					<input type="text" onChange={this.changeMedian.bind(this, i)} className="form-control" placeholder="Median" value={variable.median} />
					<span className="separator">&plusmn;</span>
					<input type="text" onChange={this.changeRadius.bind(this, i)} className="form-control" placeholder="Radius" value={variable.radius} />
				</div>
				<div className="col-md-1">
					<button className="btn btn-danger" onClick={this.removeVar.bind(this, i)}><span className="glyphicon glyphicon-minus"></span></button>
				</div>
			</div>);
	},

	renderDigitValue(variable, i) {
		return (
			<div className="form-group" key={i}>
				{this.renderTypeSelector(variable, i)}
				<div className="col-md-9 varinput">
					<input type="text" onChange={this.changeName.bind(this, i)} className="form-control" placeholder="Name" value={variable.name} />
					<span className="separator">=</span>
					<input type="text" onChange={this.changeMedian.bind(this, i)} className="form-control" placeholder="Messwert" value={variable.median} />
					<span className="separator">,</span>
					<input type="text" onChange={this.changePercentage.bind(this, i)} className="form-control" placeholder="Relativer Fehler" value={variable.percentage} />
					<span className="separator">%</span>
					<input type="text" onChange={this.changeDigit.bind(this, i)} className="form-control" placeholder="Digit Fehler" value={variable.digit} />
					<span className="separator">d</span>
				</div>
				<div className="col-md-1">
					<button className="btn btn-danger" onClick={this.removeVar.bind(this, i)}><span className="glyphicon glyphicon-minus"></span></button>
				</div>
			</div>
			);
	},

	render() {
		var displayVar = (variable, i) => {
			if (variable.type == 'digitvalue') {
				return this.renderDigitValue(variable, i);
			}
			return this.renderErrorValue(variable, i);
		};

		return (
			<div className="well">
				<h4>Variablen</h4>
				
				<div className="row">
					<form className="form-horizontal">
						{ this.state.variables.map(displayVar)}
					</form>
				</div>
				
				<div className="row">
					<div className="col-md-12">
						<form onSubmit={this.addVar}>
							<button className="btn btn-primary" type="submit">Wert hinzufügen</button>
						</form>
					</div>
					
				</div>
			</div>
		)
	}
});

export default VariableInput;