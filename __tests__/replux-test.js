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

        getAndCheck('box1', 'red');
        getAndCheck('readReducer1', 'green');
    });
});
