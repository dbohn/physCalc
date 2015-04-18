import React from 'react'

var CalculatorForm = React.createClass({

	getInitialState() {
		return {
			term: this.props.initialTerm
		}
	},

	getDefaultProps() {
		return {
			initialTerm: ''
		}
	},

	startCalculation(ev) {
		ev.preventDefault();
		this.props.onChange(this.state.term.trim());
	},

	onChange(e) {
		this.setState({ term: e.target.value });
	},

	render() {
		return <form onSubmit={this.startCalculation}>
				<div className="input-group input-group-lg">
					<input onChange={this.onChange} value={this.state.term} type="text" className="form-control" placeholder="Bitte einen Ausdruck angeben!" />
					<span className="input-group-btn">
		        		<button className="btn btn-default" type="submit"><span className="glyphicon glyphicon-arrow-right"></span></button>
		      		</span>
				</div>
			</form>
	}
});

export default CalculatorForm;