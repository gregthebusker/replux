var React = require('react');
var Reducer1 = require('./Reducer1.js');
var connector = require('./connector.js');
var ComponentBox = require('./ComponentBox.js');


var SetReducer1 = React.createClass({
    propTypes: {
        color: React.PropTypes.string,
    },

    onClick() {
        this.props.dispatch(Reducer1.Reducer, Reducer1.Actions.setColor(this.props.color));
    },

    render() {
        return (
            <ComponentBox content={<button className={this.props.className} onClick={this.onClick}>Set color to {this.props.color}</button>}>
                {this.props.children}
            </ComponentBox>
        );
    },
});

module.exports = connector([{
    reducer: Reducer1.Reducer,
    mapToProps: (state) => {},
}])(SetReducer1);
