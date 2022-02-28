const initState = {
    event: {}
};

const reducers = (state = initState, action) => {
    switch(action.type) {
        case 'event':
            return {
                ...state,
                event: {
                    ...state.event,
                    [action.prop]: action.value
                }
            }
            break;

        default:
            return state;
    }
}

export default reducers;