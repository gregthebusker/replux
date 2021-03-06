var React = require('react');
var ComponentBox = require('./ComponentBox.js');
var Reducer1 = require('./Reducer1.js');
var connector = require('./connector.js');


var ReadReducer1 = React.createClass({
    propTypes: {
        color: React.PropTypes.string,
    },

    statics: {
        testStatic() {
            return 'test';
        },
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
    reducer: Reducer1.Reducer,
    mapToProps: (state) => {
        return {
            color: state.color,
        };
    }
}])(ReadReducer1);
