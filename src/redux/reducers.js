import SocketTasks from './SocketTasks';

const initState = {
    event: {
        date: new Date().getTime()
    },
    user: {},
    isShowModalTasks: false,
    tasks: SocketTasks.getTasks(),
    error: null
};


const reducers = (state = initState, action) => {
    switch(action.type) {
        case 'setError':
            return {
                ...state,
                error: action.value
            };

        case 'editTask':
             SocketTasks.editItem(action.task);
             return state;

        case 'createTask':
            SocketTasks.createTask(action.task);
            return state;

        case 'deleteTask':
            SocketTasks.deleteTask(action.task);
            return state;

        case 'createSection':
            SocketTasks.createSection(action);
            return state;

        case 'deleteSection':
            SocketTasks.deleteSection(action.id);
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