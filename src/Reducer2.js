var { reduce, uniquify } = require('./Utilities.js');

var Types = uniquify({
    SET_COLOR: '',
});

var Actions = {
    setColor: (color) => {
        return {
            type: Types.SET_COLOR,
            color,
        };
    },
};

var defaultState = {
    color: 'red',
};

var Reducer = reduce(defaultState, (state={}, action) => {
    switch (action.type) {
        case Types.SET_COLOR:
            return {
                ...state,
                color: action.color,
            };
        default:
            return state;
    }
});

module.exports = {
    Reducer: Reducer,
    Actions: Actions,
    defaultState: defaultState
};
