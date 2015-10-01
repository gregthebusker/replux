var React = require('react');
var { getReducerName } = require('./InternalUtils.js');

var Creator = (createStore=() => {}, baseReducers=[], inheritedReducers=[]) => {

    var allReducers = [...baseReducers, ...inheritedReducers];

    var contextTypes = {};
    allReducers.map(r => {
        var name = getReducerName(r);
        contextTypes[name] = React.PropTypes.object;
    });

    return React.createClass({
        contextTypes: contextTypes,

        childContextTypes: contextTypes,

        componentWillMount() {
            var childContext = {};

            inheritedReducers.map(r => {
                var name = getReducerName(r);
                var contextReducer = this.context[name];
                if (!contextReducer) {
                    contextReducer = createStore(r);
                }
                childContext[name] = contextReducer;
            });

            baseReducers.map(r => {
                var name = getReducerName(r);
                childContext[name] = createStore(r);
            });

            for (var key in childContext) {
                var store = childContext[key];
                store.subscribe(this.subscribeToStore);
            }

            this.childContext = childContext;
        },

        getChildContext() {
            return this.childContext;
        },

        subscribeToStore() {
            this.forceUpdate();
        },

        render() {
            return this.props.children();
        },
    });
};

var Container = React.createClass({
    propTypes: {
        baseReducers: React.PropTypes.array,
        createStore: React.PropTypes.func.isRequired,
        inheritedReducers: React.PropTypes.array,
    },

    render() {
        var CreatorClass = Creator(
            this.props.createStore,
            this.props.baseReducers,
            this.props.inheritedReducers
        );
        return (
            <CreatorClass>
                {this.props.children}
            </CreatorClass>
        );
    },
});

module.exports = Container;
