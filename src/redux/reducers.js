const initState = {
    event: {
        date: new Date().getTime()
    },
    user: {}
};

const reducers = (state = initState, action) => {
    switch(action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.user
            }

        case 'event':
            return {
                ...state,
                event: {
                    ...state.event,
                    [action.prop]: action.value
                }
            };

        default:
            return state;
    }
}

export default reducers;