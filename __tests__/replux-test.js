describe('App Tests', () => {
    it('Renders colors correctly in root', () => {
        var App = require('../src/App.js');
        var React = require('react');
        var ReactDOM = require('react-dom');
        var TestUtils = require('react-addons-test-utils');

        var dom = TestUtils.renderIntoDocument(
          <App />
        );

        var getAndCheck = (className, color) => {
            var component = TestUtils.findRenderedDOMComponentWithClass(
                dom, className);
            var box = ReactDOM.findDOMNode(component);
            var boxes = box.querySelectorAll('.color-box');
            expect(boxes[0].style.backgroundColor).toEqual(color);
        };

        var click = (className) => {
            var component = TestUtils.findRenderedDOMComponentWithClass(
                dom, className);
            TestUtils.Simulate.click(component);
        };

        getAndCheck('readReducer1-1', 'green');
        getAndCheck('readReducer1-2', 'green');
        getAndCheck('readReducer1-3', 'green');

        click('setReducer1-2');
        getAndCheck('readReducer1-1', 'green');
        getAndCheck('readReducer1-2', 'green');
        getAndCheck('readReducer1-3', 'yellow');

        click('setReducer1-1');
        getAndCheck('readReducer1-1', 'yellow');
        getAndCheck('readReducer1-2', 'yellow');
        getAndCheck('readReducer1-3', 'yellow');


        getAndCheck('readReducer2-1', 'red');
        getAndCheck('readReducer2-2', 'red');
        getAndCheck('readReducer2-3', 'red');

        click('setReducer2-1');
        getAndCheck('readReducer2-1', 'blue');
        getAndCheck('readReducer2-2', 'blue');
        getAndCheck('readReducer2-3', 'red');

        click('setReducer2-2');
        getAndCheck('readReducer2-1', 'blue');
        getAndCheck('readReducer2-2', 'blue');
        getAndCheck('readReducer2-3', 'teal');


    });
});
