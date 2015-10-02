var React = require('react');
var Reducer2 = require('./Reducer2.js');
var connector = require('./connector.js');
var ComponentBox = require('./ComponentBox.js');


var SetReducer2 = React.createClass({
    propTypes: {
        color: React.PropTypes.string,
    },

    onClick() {
        this.props.dispatch(Reducer2.Reducer, Reducer2.Actions.setColor(this.props.color));
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
    reducer: Reducer2.Reducer,
    mapToProps: (state) => {},
}])(SetReducer2);
