import {io} from 'socket.io-client'
import store from './store';
import Swal from "sweetalert2";

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

    socket.on('getTasks', (list) => {
        tasks = list;
        store.dispatch({
            type: 'updateTasks',
            list: list
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

const Tasks = {
    getTasks() {
        return tasks;
    },

    deleteItem(task) {
        socket.emit('deleteTask', task);
    },

    createSection(section) {
        try {
            console.log(section);

            console.log('createSection');

            //socket.emit('createSection', fakeSection);

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
    }
}

export default Tasks;