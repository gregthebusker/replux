require('babel/polyfill');
var React = require('react');
var ComponentBox = require('./ComponentBox.js');
var ReadReducer1 = require('./ReadReducer1.js');
var ReadReducer2 = require('./ReadReducer2.js');
var SetReducer1 = require('./SetReducer1.js');
var SetReducer2 = require('./SetReducer2.js');
var Creator = require('./Creator.js');
var Reducer1 = require('./Reducer1.js');
var Reducer2 = require('./Reducer2.js');
var { createStore } = require('redux');

var App = React.createClass({
    render() {
        return (
            <Creator createStore={createStore} baseReducers={[Reducer1.Reducer]}>
                <div>
                    App Test Page
                    <div>
                        <ReadReducer1 className="readReducer1-1">
                            <SetReducer1 className="setReducer1-1" color="yellow">
                                <ReadReducer1 className="readReducer1-2" />
                                <ComponentBox/>
                            </SetReducer1>
                            <Creator createStore={createStore} baseReducers={[Reducer1.Reducer]}>
                                <ComponentBox content="New Instance of Base Reducer1">
                                    <SetReducer1 className="setReducer1-2" color="yellow">
                                        <ReadReducer1 className="readReducer1-3" />
                                    </SetReducer1>
                                </ComponentBox>
                            </Creator>
                            <Creator createStore={createStore} inheritedReducers={[Reducer2.Reducer]}>
                                <ComponentBox content="Inherit Reducer 2">
                                    <ReadReducer2 className="readReducer2-1" />
                                    <Creator createStore={createStore} inheritedReducers={[Reducer2.Reducer]}>
                                        <ComponentBox content="Inherit Reducer 2">
                                            <ReadReducer2 className="readReducer2-2" />
                                            <SetReducer2 className="setReducer2-1" color="blue" />
                                        </ComponentBox>
                                    </Creator>
                                    <Creator createStore={createStore} baseReducers={[Reducer2.Reducer]}>
                                        <ComponentBox content="New Instance Reducer 2">
                                            <ReadReducer2 className="readReducer2-3" />
                                            <SetReducer2 className="setReducer2-2" color="teal" />
                                        </ComponentBox>
                                    </Creator>
                                </ComponentBox>
                            </Creator>
                        </ReadReducer1>
                    </div>
                </div>
            </Creator>
        );
    },
});

module.exports = App;
