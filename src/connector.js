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

            render() {
                var props = {};
                reducerObjects.map(obj => {
                    var name = getReducerName(obj.reducer);
                    props = {
                        ...props,
                        ...obj.mapToProps(this.context[name].getState()),
                    };
                });

                return <WrappedComponent {...this.props} {...props} />;
            },
        });
    };
};

module.exports = connector;
