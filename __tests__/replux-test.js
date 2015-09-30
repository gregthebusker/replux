jest.dontMock('../src/App.js');
jest.dontMock('../src/ComponentBox.js');

describe('App Tests', () => {
    it('Renders colors correctly in root', () => {
        var React = require('react/addons');
        var App = require('../src/App.js');
        var TestUtils = React.addons.TestUtils;

        var dom = TestUtils.renderIntoDocument(
          <App />
        );

        var box1 = TestUtils.findRenderedDOMComponentWithClass(
            dom, 'box1');
        var box = React.findDOMNode(box1);
        var boxes = box.querySelectorAll('.color-box');
        expect(boxes[0].style.backgroundColor).toEqual('red');
    });
});
