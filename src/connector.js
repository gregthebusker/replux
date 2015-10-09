var React = require('react');
var { getReducerName } = require('./InternalUtils.js');

var connector = (reducerObjects=[]) => {
    var contextTypes = {};
    reducerObjects.map(obj => {
        var name = getReducerName(obj.reducer);
        contextTypes[name] = React.PropTypes.object;
    });

    return function wrapWithConnector(WrappedComponent) {
        return React.createClass({
            contextTypes: contextTypes,

            dispatch(reducer, action) {
                var name = getReducerName(reducer);
                this.context[name].dispatch(action);
            },

            getState(reducer) {
                var name = getReducerName(reducer);
                return this.context[name].getState();
            },

            render() {
                var props = {};
                reducerObjects.map(obj => {
                    if (!obj.mapToProps) {
                        return;
                    }

                    var name = getReducerName(obj.reducer);
                    props = {
                        ...props,
                        ...obj.mapToProps(this.context[name].getState(), this.props),
                    };
                });

                return (
                    <WrappedComponent
                        {...this.props}
                        {...props}
                        dispatch={this.dispatch}
                        getState={this.getState}
                    />
                );
            },
        });
    };
};

module.exports = connector;
