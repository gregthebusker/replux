var React = require('react');

var ComponentBox = React.createClass({
    render() {
        return (
            <div style={{
                width: '100%',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <div
                        style = {{
                            width: 100,
                            height: 100,
                            border: '1px solid black',
                        }}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    },
});

module.exports = ComponentBox;
