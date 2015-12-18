var React = require('react');
var { getReducerName } = require('./InternalUtils.js');
var hoistStatics = require('hoist-non-react-statics');

var connector = (reducerObjects=[]) => {
    var contextTypes = {};
    reducerObjects.map(obj => {
        var name = getReducerName(obj.reducer);
        contextTypes[name] = React.PropTypes.object;
    });

    return function wrapWithConnector(WrappedComponent) {
        var Container = React.createClass({
            contextTypes: contextTypes,

            dispatch(reducer, action) {
                var name = getReducerName(reducer);
                this.context[name].dispatch(action);
            },

            getState(reducer) {
                var name = getReducerName(reducer);
                return this.context[name].getState();
            },

            componentDidMount() {
                this.unsubscribes = [];
                reducerObjects.map(obj => {
                    var name = getReducerName(obj.reducer);
                    this.unsubscribes.push(this.context[name].subscribe(this.subscribeToStore));
                });
            },

            componentWillUnmount() {
                this.unsubscribes.map(un => un());
            },

            subscribeToStore() {
                this.forceUpdate();
            },

            render() {
                var props = {};
                reducerObjects.map(obj => {
                    var mappedProps = {};
                    if (obj.mapToProps) {
                        var name = getReducerName(obj.reducer);
                        mappedProps = obj.mapToProps(this.context[name].getState(), this.props);
                    }

                    props = {
                        ...props,
                        ...mappedProps,
                    };
                });

                return (
                    <WrappedComponent
                        {...this.props}
                        {...props}
                        dispatch={this.dispatch}
                        repluxDispatch={this.dispatch}
                        getState={this.getState}
                    />
                );
            },
        });

        return hoistStatics(Container, WrappedComponent);
    };
};

module.exports = connector;
