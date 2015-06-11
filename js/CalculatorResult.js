import React from 'react/addons'

var CalculatorResult = React.createClass({

	getDefaultProps() {
		return {
			errorInterval: {
				getMedian: function() {return 0; },
				getRadius: function() { return 0; },
				relativeError: function() { return 0; }
			}
		}
	},

	showMedian() {
		if (!this.props.errorInterval) {
			return '';
		}
		return this.props.errorInterval.getMedian();
	},

	showRadius() {
		if (!this.props.errorInterval) {
			return '';
		}
		return this.props.errorInterval.getRadius();
	},

	showRelativeError() {
		if (!this.props.errorInterval) {
			return '';
		}
		return this.props.errorInterval.relativeError();
	},

	showSteps() {
		if (!this.props.errorInterval) {
			return '';
		}

		return this.props.errorInterval.steps.map(function (el, i) {
			return <li key={i}>{el}</li>;
		});
	},

	render() {
		var cx = React.addons.classSet;
		var classes = cx({
			'row': true,
			'result_container': true,
			'hide': !this.props.errorInterval
		});

		return (
			<div className={classes}>
			<div className="col-md-12">
				<h2 className="result">e=({this.showMedian()} &#177; {this.showRadius()}) &delta;e={this.showRelativeError()}</h2>
				<ul className="steps">
					{this.showSteps()}
				</ul>
			</div>
		</div>)
	}
});

export default CalculatorResult;