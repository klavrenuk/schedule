import SocketController from './SocketController';

const initState = {
    user: {},
    events: SocketController.events(),
    isShowModalTasks: false,
    tasks: SocketController.tasks(),
    error: null
};


const reducers = (state = initState, action) => {
    switch(action.type) {
        case 'eventsUpdated':
            return {
                ...state,
                events: SocketController.events()
            };

        case 'tasksUpdated':
            return {
                ...state,
                tasks: SocketController.tasks()
            };

        case 'getTasks':
            SocketController.getTasks(action.listType);
            return state;

        case 'setError':
            return {
                ...state,
                tasks: SocketController.getTasks(),
                error: action.value
            };

        case 'editTask':
             SocketController.editItem(action.task);
             return state;

        case 'createTask':
            SocketController.createTask(action.task);
            return state;

        case 'deleteTask':
            SocketController.deleteTask(action.task);
            return state;

        case 'createSection':
            SocketController.createSection(action.section);
            return state;

        case 'deleteSection':
            SocketController.deleteSection(action.id);
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

        default:
            return state;
    }
}

export default reducers;