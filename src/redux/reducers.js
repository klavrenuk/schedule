import SocketTasks from './SocketTasks';

const initState = {
    event: {
        date: new Date().getTime()
    },
    user: {},
    isShowModalTasks: false,
    tasks: SocketTasks.tasks(),
    error: null
};


const reducers = (state = initState, action) => {
    switch(action.type) {
        case 'tasksUpdated':
            return {
                ...state,
                tasks: SocketTasks.tasks()
            };

        case 'getTasks':
            SocketTasks.getTasks(action.listType);
            return state;

        case 'setError':
            return {
                ...state,
                tasks: SocketTasks.getTasks(),
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
            SocketTasks.createSection(action.section);
            return state;

        case 'deleteSection':
            SocketTasks.deleteSection(action.id);
            return state;

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