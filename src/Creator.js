var React = require('react');
var { getReducerName } = require('./InternalUtils.js');

var Creator = (createStore=() => {}, reducers=[]) => {

    var contextTypes = {};
    reducers.map(r => {
        var name = getReducerName(r.reducer);
        contextTypes[name] = React.PropTypes.object;
    });

    return React.createClass({
        contextTypes: contextTypes,

        childContextTypes: contextTypes,

        componentWillMount() {
            var childContext = {};

            reducers.map(r => {
                var name = getReducerName(r.reducer);
                var contextReducer = this.context[name];
                if (!r.inherit || !contextReducer) {
                    contextReducer = createStore(r.reducer, r.baseState);
                }
                childContext[name] = contextReducer;
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
            if (typeof this.props.children == 'function') {
                return this.props.children();
            } else {
                return React.Children.only(this.props.children);
            }
        },
    });
};

var Container = React.createClass({
    propTypes: {
        createStore: React.PropTypes.func.isRequired,
        reducers: React.PropTypes.array,
    },

    componentWillMount() {
        this.CreatorClass = Creator(
            this.props.createStore,
            this.props.reducers
        );
    },

    render() {
        var CreatorClass = this.CreatorClass;
        return (
            <CreatorClass>
                {this.props.children}
            </CreatorClass>
        );
    },
});

module.exports = Container;
