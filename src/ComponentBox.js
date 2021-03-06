var React = require('react');

var ComponentBox = React.createClass({
    propTypes: {
        colors: React.PropTypes.array,
        content: React.PropTypes.any,
    },

    getDefaultProps() {
        return {
            colors: [],
        };
    },

    render() {
        var content = this.props.content;
        if (!content) {
            content = this.props.colors.map((c, i) => {
                return (
                    <div
                        className="color-box"
                        key={i}
                        style={{
                            backgroundColor: c,
                            width: '100%',
                            height: '100%',
                        }}
                    />
                );
            });
        }
        return (
            <div style={{
                width: '100%',
            }}>
                <div
                    className={this.props.className}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <div
                        style = {{
                            width: 100,
                            height: 100,
                            border: '1px solid black',
                            display: 'flex',
                        }}>
                        {content}
                    </div>
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
