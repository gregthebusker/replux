# replux

[![Build Status](https://travis-ci.org/gregthebusker/replux.svg)](https://travis-ci.org/gregthebusker/replux)
[![Dependency Status](https://david-dm.org/gregthebusker/replux.svg)](https://david-dm.org/gregthebusker/replux)
[![devDependency Status](https://david-dm.org/gregthebusker/replux/dev-status.svg)](https://david-dm.org/gregthebusker/replux#info=devDependencies)

> Self contained components and enhancements for [Redux](https://github.com/rackt/redux)

* [Background](#background-and-why-redux)
* [The Problem](#the-problem)
* [Why Redux](#why-redux)
* [Api](#api)
- [Creator](#creator)
- [connector](#connector)
* [Utilities](#utilities)


## Background and why Redux

As a project grows there's increased need for a library to handle its application architecture.  In React the main design pattern to accomplish this is [Flux](https://facebook.github.io/flux/)(check it out for a more detailed explanation).  Facebook has a library build around this design pattern, but its pretty minimal.  Personally I think it doesn't provide the utility needed to build a react application quickly, clean, and maintainable.  Luckily there are many other libraries that do a much better job.  I spent some time looking over the many libraries available, and landed on [Redux](https://github.com/rackt/redux) as the best library to solve my needs.  Recommend you check out the redux website and read through their documentation.

## The Problem

Redux does a great job at building a clean interface of connecting components to a store in react.  But from my experience redux has some struggles in code reusability and portability.  Let's take an example I deal with often in my work; Tables.  Tables have a lot of different properties to them.  Here's a couple of examples of properties you might want to set in your store for your application state.

- Sorting: Which column is sorted, is it ascending or descending.
- Pagination: What page of data the user is on
- Selection: Rows of the table that are selected
- Columns: Which columns to show
- Etc..

Redux works really well for this example.  You could have a different reducer for each of these examples.  One reducer that stores the pagination details, one that store the sorting details, and so on.  The problem with Redux comes when you want to start having multiple tables on a page, or maybe there's a table in a pop up.  For most cases each of your tables should operate independently of one another.  If you sort one table, it shouldn't necessarily change the sorting of the other.

Let's look at how you might solve one aspect of this example with redux: Pagination.  Imagine we've built a pagination component.  It uses `redux.connect` to connect it to our redux store and can fire actions that update the page we're on.  The tricky part comes when we have multiple tables(and thus multiple paginators).  The first thing we need to do is generate multiple reducers and combine them at the top level of our component.

```js
var { combineReducers } = require('redux');

var genReducer = (reducer) => {
    // Custom code to create a reducer with unique actions and
    // types so it can be reusable.
};

var reducer = combineReducers({
    Reducer1: genReducer(PaginationReducer1),
    Reducer2: genReducer(PaginationReducer2)
});
```

In addition we'll need to make sure our pagination component is connected to the right reducer and is able to dispatch the correct events to update the correct reducer.  We can write a helper function to make this more reusable too.

```js
// Paginator for our first table.
var Paginator = require('Paginator');
var { connect } = require('redux');

var getPaginatorProps = (state) {
    return {
        page: state.page,
        somethingElse: state.somethingElse,
    };
};

module.exports = connect((state, props) => {
    return {
        ...getPaginatorProps(state),
        // You'll also need to make sure this component has access to
        // the right bound actions to dispatch.  I'm not going to show
        // you the details on how to do that because I think it makes
        // the example even more complicated.
        actions: boundActionsForReducer1,
    };
})(Paginator);
```

As you can see our example is starting to get a bit complicated.  And our easily reusable Paginator component isn't that reusable anymore.  If we want to add another table to our application we have to update our top level reducer and create a new wrapper for our Paginator component that connects it properly.  And there is more work that we'll need to do to update the Table component that encompasses our Paginator component.  As our application expands and more tables are part of our application we quickly loose the simplicity and maintainability we attempt to gain with a flux architecture.

## Why Redux

So the first thing we want to do to clean up our table example, is to change where we instantiate our reducer store.  Instead of combining reducer at the root of our application, lets do it at our component level.  In our example we we could have our Table component create the reducer.

```js
var Table = React.createClass({
    render() {
        var store = createStore(reducer);
        return (
            <Provider store={store}>
                // Our table components.
            </Provider>
        )
    },
})
```

This solves some of the issues.  Our Paginator component can now dispatch the same even no matter where its used and it will update the correct store.  But it also restricts all the components that are descendants of Table to only have access to the reducers that we instantiated at this level.  This is mostly fine until we want to read from a reducer that was instantiated in an ancestor of our Table component.  We can copy it into the Table store, but that only generates a copy that can only be mutated locally, because our dispatch calls are scoped only to this new store.  This is where replux comes in.

Instead of combining reducers into one store replux structors reducers into their own individual stores.  By doing this we can instantiate reducer at the component level or the root level, and have component inherit reducers when needed.  Lets see how this works with replux.

Replux introduces a `Creator` component similar to the `Provider` component in react-redux.  The `Creator` component will instantiate a redux store for each reducer.  In addition you can specify which components should be inherited from its ancestor components.  If the component was not be instantiated yet, it will do it here.  Here's an example of how we might use it.

```js
var React = require('react');
var { Creator } = require('replux');
var Table = React.createClass({
    render() {
        var store = createStore(reducer);
        return (
            <Creator createStore={createStore} reducers={[{
                // An example of a reducer that should be
                // instantiated with this component.
                reducer: PaginatorReducer,
            }, {
                // An example of a reducer that might be instantiated
                // at the root of your application.
                // We declare it here as a dependency and only
                // instantiate it if it hasn't been created already.
                reducer: UserReducer,
                inherit: true,
            }]}>
                // Our table components
            </Creator>
        )
    },
})
```

Replux also introduces a `connector` function with models off of the `connect` function from react-redux.  The `connector` works very similar to connect.  Instead of having one mapToProps function you need to specify one for each reducer.  Your reducer's state will be transferred as props to your component just like with react-redux.  `this.props.dispatch` and `this.props.getState` have a small change where you must pass the reducer function as the first argument.  Here's an example.


```js
var React = require('react');
var PaginatorReducer = require('PaginatorReducer');
var { connector } = require('replux');

var Paginator = React.createClass({
    onClick() {
        this.props.dispatch(
            PaginatorReducer, PaginatorActions.setPage(this.props.page + 1)
        );
    },

    render() {
        /**
         * getState example
         * I recommend you don't use getState in your react
         * component.  Instead get access to the state with the
         * connector function and pass values in as props.
         *
         * getState should be passed to your reducer actions when one
         * reducer depends on another.
         * var state = this.props.getState(PaginatorReducer);
         */
        return (
            <div>
                Page {this.props.page}
                <button onClick={this.onClick}>Next Page</button>
            </div>
        );
    },
});

module.exports = connector([{
    reducer: PaginatorReducer,
    mapToProps: (state) => {
        return {
            // Notice because this state if bound to the reducer
            // function, we no longer need to worry about what key it
            // was bound to in combine reducers.
            page: state.page,
        };
    }
}])(Paginator);
```

Because each reducer is now its own store, `getState` from redux doesn't provide the utility of getting data from other stores.  Replux has a get function for this purpose.  The `getState` function is passed to your react component by `connector` and as stated earlier requires you to pass in the reducer to get the state of that reducer.  Even though it is passed in as props I recommend you don't use `getState` in your react component.  Instead pass in the state as props with `connector`. You should pass `getState` to your reducer actions when one reducer depends on another.

```js

// Table actions

// Notice this example uses the thunk plugin from redux-thunk.
var fetchData = (getState) => {
        return (dispatch, getState) => {
            var page = getState(PaginatorReducer).page;
            // Notice this is the redux dispatch function and not the replux dispatch.
            dispatch({
                type: 'fetching',
            });
            // Fetch our data.
        };
    },
},



// Table component
var Table = React.createClass({
    componentWillReceiveProps(nextProps) {
        if (nextProps.page != this.props.page) {
            this.fetchData();
        }
    },

    fetchData() {
        // You could pass also pass this.props.page to fetchData.
        // I'm passing this.props.getState just to show you how it might work.
        this.props.dispatch(
            TableReducer,
            TableActions.fetchData(this.props.getState)
        );
    },

    render() {
        // Render details
    },
});

module.exports = connector([{
    reducer: TableReducer,
    mapToProps: (state) => {
        return {
            data: state.data,
        };
    },
}, {
    reducer: PaginatorReducer,
    mapToProps: (state) => {
        return {
            page: state.page,
        };
    }
}])(Table);
```




## API

### `Creator`

#### `props`
##### `reducers: Array({ reducer, baseState, inherit})`
- reducer : function
A redux reducer function.
- baseState : any
The base state of the reducer.  Will be passed into `createStore`.
- inherit : bool
True if this reducer should inherit a previous instantiated reducer

##### `createStore: function(reducer, baseState)`
This should the same `createStore` function from redux.

### `connector`
#### `function(Array({ reducer, mapToProps }))(ReactComponent)`
connector expects an array of object.  Each object should have the following
- reducer : function
A redux reducer function.
- mapToProps : function(state, props) returns object
A function that returns an object to be send as props.

#### `this.props.dispatch: function(reducer, action)`
Works the same as this.props.dispatch from react-redux except it require the reducer function used to instantiate the reducer.

#### `this.props.getState: function(reducer)`
Works the same as `getState` from redux except it require the reducer function used to instantiate the reducer.  Notice it is passed in as props.  If you need access to it in your redux actions you should pass it into the function call.

## Utilities

Replux also includes some extra utility functions to ease development.

### `reduce : function(defaultState, reducer function) returns function`

reduce will merge your default state into the given state.  This function is useful when you pass in a base state to `createStore`.  Normally using rest parameters any field you don't specify would be undefined, which might not be what you want.  With `reduce` it will gracefully merge in your default state so you need to only specify the properties you want to set.


```js
var { reduce } = require('replux');

var defaultState = {
    example: '',
    private_example: 'some-string',
};

var Reducer = reduce(defaultState, (state={}, action) => {
    switch (action.type) {
        // Reducer code.
    }
});


var store = createStore(Reducer, {
    example: 'example'
});

// Without reduce
console.log(store.getState().private_example) // undefined

// With reduce
console.log(store.getState().private_example) // 'some-string'


```

### `uniquify : function(Object Map) return object`

uniquify takes a map and gives each key a unique string value.  This makes it easier to name your action types.  If you choose not to use `Creator` and `connector` you can still use this function to make sure all actions have unique types when you call `combineReducers` in redux.

```js
var { reduce, uniquify } = require('replux');

var Types = uniquify({
    EXAMPLE: '', // No need to worry about what to call this action.
});

var defaultState = {
    example: '',
};

var Reducer = reduce(defaultState, (state={}, action) => {
    switch (action.type) {
        case Types.EXAMPLE:
            return {
                ...state,
                example: action.example,
            };
        default:
            return state;
    }
});
```
