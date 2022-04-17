import Tasks from './Tasks';

const initState = {
    event: {
        date: new Date().getTime()
    },
    user: {},
    isShowModalTasks: false,
    tasks: Tasks.getTasks()
};


const reducers = (state = initState, action) => {
    switch(action.type) {
        case 'editTask':
             Tasks.editItem(action.task);
             return state;

        case 'createTask':
            Tasks.createTask(action.task);
            return state;

        case 'deleteTask':
            Tasks.deleteItem(action.task);
            return state;

        case 'createSection':
            Tasks.createSection(action);
            return state;

        case 'updateTasks':
            return {
                ...state,
                tasks: action.list
            };

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