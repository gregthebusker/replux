# replux

[![Build Status](https://travis-ci.org/gregthebusker/replux.svg)](https://travis-ci.org/gregthebusker/replux)
[![Dependency Status](https://david-dm.org/gregthebusker/replux.svg)](https://david-dm.org/gregthebusker/replux)
[![devDependency Status](https://david-dm.org/gregthebusker/replux/dev-status.svg)](https://david-dm.org/gregthebusker/replux#info=devDependencies)

> Self contained components and enhancements for [Redux](https://github.com/rackt/redux)

## Background and why Redux

As a project grows there's increased need for a library to handle its application architecture.  In React the main design pattern to accomplish this is [Flux](https://facebook.github.io/flux/)(check it out for a more detailed explanation).  Facebook has a library build around this design pattern, but its pretty minimal.  Personally I think it doesn't provide the utility needed to build a react application quickly, clean, and maintainable.  Luckily there are many other libraries that do a much better job.  I spent some time looking over the many libraries available, and landed on [Redux](https://github.com/rackt/redux) as the best library to solve my needs.  Recommend you check out the redux website and read through their documentation.

## Why Replux

Redux does a great job at building a clean interface of connecting components to a store in react.  But from my experience redux has some struggles in code reusability and portability.  Let's take an example I deal with often in my work; Tables.  Tables have a lot of different properties to them.  Here's a couple of examples of properties you might want to set in your store for your application state.

- Sorting: Which column is sorted, is it ascending or descending.
- Pagination: What page of data the user is on
- Selection: Rows of the table that are selected
- Columns: Which columns to show
- Etc..

Redux works really well for this example.  You could have a different reducer for each of these examples.  One reducer that stores the pagination details, one that store the storting details, and so on.  The problem with Redux comes when you want to start having multiple tables on a page, or maybe there's a table in a pop up.  For most cases each of your tables should operate independently of one another.  If you sort one table, it shouldn't necessarily change the sorting of the other. 

## Main API

### Creator
### connector

## Utility API

### uniquify
### reduce
