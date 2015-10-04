var React = require('react');
var ComponentBox = require('./ComponentBox.js');
var Reducer1 = require('./Reducer1.js');
var connector = require('./connector.js');


var ReadWithGetState = React.createClass({
    propTypes: {
        color: React.PropTypes.string,
    },

    render() {
        var state = this.props.getState(Reducer1.Reducer);
        return (
            <ComponentBox colors={[state.color]} className={this.props.className}>
                {this.props.children}
            </ComponentBox>
        );
    },
});

module.exports = connector([{
    reducer: Reducer1.Reducer,
}])(ReadWithGetState);
