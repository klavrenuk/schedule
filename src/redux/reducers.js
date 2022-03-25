const initState = {
    event: {
        date: new Date().getTime()
    },
    user: {},
    isShowModalTasks: false
};

const reducers = (state = initState, action) => {
    switch(action.type) {
        case 'toggleModalTasks':
            let value = true;

            if(state.isShowModalTasks) {
                value = false;
            }

            return {
                ...state,
                isShowModalTasks: value
            }

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