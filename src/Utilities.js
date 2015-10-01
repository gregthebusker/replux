var count = 0;

var shallowCompare = (obj1, obj2) => {
    for (var key in obj1) {
        if (obj1[key] != obj2[key]) {
            return false;
        }
    }
    return true;
};

module.exports = {
    /**
     * Reducer with a default state.
     */
    reduce: (defaultState, reducer) => {
        return (givenState={}, action) => {
            var state = {
                ...defaultState,
                ...givenState
            };

            // Keep the same state object to preserve immutability.
            if (shallowCompare(state, givenState)) {
                state = givenState;
            }

            return reducer(state, action);
        };
    },

    /**
     * Takes an object and sets each value to a unique string.
     */
    uniquify: (types) => {
        var results = {};
        for (var key in types) {
            results[key] = `${key}@${count++}`;
        }
        return results;
    },

    /**
     *  Combines two reducers.  Expects two object in the following form.
     *  {
     *     Reducer: function,
     *     Actions: object of function
     *     Types: object of strings,
     *  }
     */
    mux: (reducerObject, mixinObject) => {
        var results = {};
        for (var key in reducerObject) {
            if (key == 'Reducer') {
                results.Reducer = (state={}, action) => {
                    return reducerObject.Reducer(mixinObject.Reducer(state, action), action);
                };
            } else if (typeof reducerObject[key] == 'object') {
                results[key] = {
                    ...mixinObject[key],
                    ...reducerObject[key],
                };
            } else {
                results[key] = reducerObject[key];
            }
        }

        return results;
    },
};
