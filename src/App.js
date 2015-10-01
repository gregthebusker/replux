require('babel/polyfill');
var React = require('react');
var ComponentBox = require('./ComponentBox.js');
var ReadReducer1 = require('./ReadReducer1.js');
var Creator = require('./Creator.js');
var Reducer1 = require('./Reducer1.js');
var { createStore } = require('redux');

var App = React.createClass({
    render() {
        return (
            <Creator createStore={createStore} baseReducers={[Reducer1.Reducer]}>
                {() =>
                    <div>
                        App Test Page
                        <div>
                            <ComponentBox colors={['red', 'blue']} className="box1">
                                <ReadReducer1 className="readReducer1" />
                                <ComponentBox>
                                    <ComponentBox/>
                                    <ComponentBox/>
                                </ComponentBox>
                                <ComponentBox>
                                    <ComponentBox/>
                                    <ComponentBox/>
                                </ComponentBox>
                            </ComponentBox>
                        </div>
                    </div>
                }
            </Creator>
        );
    },
});

module.exports = App;
