var React = require('react');
var ComponentBox = require('ComponentBox');

var App = React.createClass({
    render() {
        return (
            <div>
                App Test Page
                <div>
                    <ComponentBox>
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
        );
    },
});

module.exports = App;
