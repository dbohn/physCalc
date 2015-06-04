import React from 'react/addons'

var VariableInput = React.createClass({
	getInitialState() {
		return {
			variables: [
				{
					type: "errorvalue",
					name: "U",
					median: 5.3,
					radius: 0.7
				}
			]
		}
	},

	addVar(e) {
		this.setState({
			variables: this.state.variables.concat([
			{
				type: "errorvalue",
				name: "",
				median: 0.0,
				radius: 0.0
			}])
		});

		e.preventDefault();
	},

	removeVar(variable, e) {
		var newData = this.state.variables.slice(); //copy array
    	newData.splice(variable, 1); //remove element
    	this.setState({variables: newData}); //update state
    	e.preventDefault();
	},

	changeName(i, e) {
		var newName = e.target.value;
		var cpy = this.state.variables.slice();
		cpy[i].name = newName;
		this.setState({
			variables: cpy
		});
	},

	changeMedian(i, e) {
		var newMedian = e.target.value;
		var cpy = this.state.variables.slice();

		cpy[i].median = newMedian;

		this.setState({
			variables: cpy
		});
	},

	changeRadius(i, e) {
		var newRadius = e.target.value;
		var cpy = this.state.variables.slice();

		cpy[i].radius = newRadius;

		this.setState({
			variables: cpy
		});
	},

	render() {
		var displayVar = (variable, i) => (
			<div className="form-group" key={i}>
							<div className="col-md-2">
								<select className="form-control" defaultValue={variable.type}>
									<option value="errorvalue">Fehlerwert</option>
									<option value="digitvalue">Digitalwert</option>
									<option value="analogvalue">Analogwert</option>
								</select>
							</div>
							<div className="col-md-3">
								<input type="text" onChange={this.changeName.bind(this, i)} className="form-control" placeholder="Name" value={variable.name} />
							</div>
							<div className="col-md-3">
								<input type="text" onChange={this.changeMedian.bind(this, i)} className="form-control" placeholder="Median" value={variable.median} />
							</div>
							<div className="col-md-3">
								<input type="text" onChange={this.changeRadius.bind(this, i)} className="form-control" placeholder="Radius" value={variable.radius} />
							</div>
							<div className="col-md-1">
								<button className="btn btn-danger" onClick={this.removeVar.bind(this, i)}><span className="glyphicon glyphicon-minus"></span></button>
							</div>
						</div>);
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