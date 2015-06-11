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

	showResult() {
		return '$ e = \\left( ' + this.showMedian() + ' \\pm ' + this.showRadius() + ' \\right) \\,\\,\\,\\, \\delta e=' + this.showRelativeError() + ' $';
	},

	render() {
		var cx = React.addons.classSet;
		var classes = cx({
			'row': true,
			'result_container': true,
			'hide': !this.props.errorInterval
		});

		// <h2 className="result" ref="resultfield">{this.showResult()} e=({this.showMedian()} &#177; {this.showRadius()}) &delta;e={this.showRelativeError()}</h2>

		return (
			<div className={classes}>
			<div className="col-md-12">
				<h2 className="result" ref="resultfield">{this.showResult()}</h2>
				<ul className="steps" ref="steps">
					{this.showSteps()}
				</ul>
			</div>
		</div>)
	},

	componentDidUpdate() {
		// console.log(React.findDOMNode(this.refs.resultfield));
		// MathJax.Hub.Queue(["Typeset",MathJax.Hub, ]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub, [React.findDOMNode(this.refs.resultfield), React.findDOMNode(this.refs.steps)]]);
	}
});

export default CalculatorResult;