describe('App Tests', () => {
    it('Renders colors correctly in root', () => {
        var App = require('../src/App.js');
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;

        var dom = TestUtils.renderIntoDocument(
          <App />
        );

        var getAndCheck = (className, color) => {
            var component = TestUtils.findRenderedDOMComponentWithClass(
                dom, className);
            var box = React.findDOMNode(component);
            var boxes = box.querySelectorAll('.color-box');
            expect(boxes[0].style.backgroundColor).toEqual(color);
        };

        var click = (className) => {
            var component = TestUtils.findRenderedDOMComponentWithClass(
                dom, className);
            TestUtils.Simulate.click(component);
        };

        getAndCheck('box1', 'red');
        getAndCheck('readReducer1-1', 'green');
        getAndCheck('readReducer1-2', 'green');

        click('setReducer1-1');
        getAndCheck('readReducer1-1', 'yellow');
        getAndCheck('readReducer1-2', 'yellow');
    });
});
