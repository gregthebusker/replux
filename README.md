# replux

[![Build Status](https://travis-ci.org/gregthebusker/replux.svg)](https://travis-ci.org/gregthebusker/replux)
[![Dependency Status](https://david-dm.org/gregthebusker/replux.svg)](https://david-dm.org/gregthebusker/replux)
[![devDependency Status](https://david-dm.org/gregthebusker/replux/dev-status.svg)](https://david-dm.org/gregthebusker/replux#info=devDependencies)

> Self contained components and enhancements for [Redux](https://github.com/rackt/redux)

## Background and why Redux

As a project grows there's increased need for a library to handle its application architecture.  In React the main design pattern to accomplish this is [Flux](https://facebook.github.io/flux/)(check it out for a more detailed explanation).  Facebook has a library build around this design pattern, but its pretty minimal.  Personally I think it doesn't provide the utility needed to build a react application quickly, clean, and maintainable.  Luckily there are many other libraries that do a much better job.  I spent some time looking over the many libraries available, and landed on [Redux](https://github.com/rackt/redux) as the best library to solve my needs.  Recommend you check out the redux website and read through their documentation.

## The problem

Redux does a great job at building a clean interface of connecting components to a store in react.  But from my experience redux has some struggles in code reusability and portability.  Let's take an example I deal with often in my work; Tables.  Tables have a lot of different properties to them.  Here's a couple of examples of properties you might want to set in your store for your application state.

- Sorting: Which column is sorted, is it ascending or descending.
- Pagination: What page of data the user is on
- Selection: Rows of the table that are selected
- Columns: Which columns to show
- Etc..

Redux works really well for this example.  You could have a different reducer for each of these examples.  One reducer that stores the pagination details, one that store the sorting details, and so on.  The problem with Redux comes when you want to start having multiple tables on a page, or maybe there's a table in a pop up.  For most cases each of your tables should operate independently of one another.  If you sort one table, it shouldn't necessarily change the sorting of the other.

Let's look at how you might solve one aspect of this example with redux: Pagination.  Imagine we've built a pagination component.  It uses `redux.connector` to connect it to our redux store and can fire actions that update the page we're on.  The tricky part comes when we have multiple tables(and thus multiple paginators).  The first thing we need to do is generate multiple reducers and combine them at the top level of our component.

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

In addition we'll need to make sure our pagination component is connect to the right reducer and is able to dispatch the correct events to update the correct reducer.  We can write a helper function to make this more reusable too.

```js
// Paginator for our first table.
var { connect } = require('redux');
var Paginator = require('Paginator');

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

As you can see our example is starting to get a bit complicated.  And our easily reusable Paginator component isn't that reusable anymore.  If we want to add another table to our application we have to update our top level reducer and create a new wrapper for our Paginator component that connects it properly.  We haven't even talked about the work to update the Table component that encompasses our Paginator component.  As our application expands and more tables are part of our application we quickly loose the simplicity and maintainability we attempt to gain with a flux architecture.


## Why Redux



## Main API

### Creator
### connector

## Utility API

### uniquify
### reduce
