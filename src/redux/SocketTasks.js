import {io} from 'socket.io-client'
import store from './store';

const socket = io('ws://');
let tasks = [],
    isConnected = false;

const processingError = (message) => {
    if(!message) {
        message = 'Error! Please, try latter';
    }

    store.dispatch({
        type: 'setError',
        value: message
    });
}

socket.on('connect', () => {
    isConnected = true;

    socket.on('listTasksUpdated', (list) => {
        tasks = list;

        store.dispatch({
            type: 'tasksUpdated'
        });
    });

    socket.on('connect_error', (err) => {
        isConnected = false;
        console.log('error', err);
    });

    socket.on('disconnect', () => {
        isConnected = false;
        console.log('disconnect');
    });

    socket.on('action_error', (err) => {
        processingError(err);
    });
});

const SocketTasks = {
    tasks() {
        return tasks;
    },

    deleteTask(task) {
        socket.emit('deleteTask', task);
    },

    deleteSection(id) {
        socket.emit('deleteSection', id);
    },

    createSection(section) {
        try {
            socket.emit('createSection', section);

        } catch (err) {
            processingError();
        }
    },

    createTask(task) {
        try {
            socket.emit('createTask', task);
        } catch (err) {
            console.log(err);
            processingError();
        }
    },

    editItem(task) {
        try {
            socket.emit('editTask', task);
        } catch (err) {
            console.log(err);
            processingError();
        }
    },

    getTasks(type) {
        socket.emit('getTasks', type);
    }
}

export default SocketTasks;