var reducerMap = new Map();
var count = 0;

module.exports = {
    getReducerName: (reducer) => {
        var name = reducerMap.get(reducer);
        if (!name) {
            name = `reducer${count++}`;
            reducerMap.set(reducer, name);
        }
        return name;
    },
};
