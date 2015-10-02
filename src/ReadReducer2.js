var React = require('react');
var ComponentBox = require('./ComponentBox.js');
var Reducer2 = require('./Reducer2.js');
var connector = require('./connector.js');


var ReadReducer2 = React.createClass({
    propTypes: {
        color: React.PropTypes.string,
    },

    render() {
        return (
            <ComponentBox colors={[this.props.color]} className={this.props.className}>
                {this.props.children}
            </ComponentBox>
        );
    },
});

module.exports = connector([{
    reducer: Reducer2.Reducer,
    mapToProps: (state) => {
        return {
            color: state.color,
        };
    }
}])(ReadReducer2);
