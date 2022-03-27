import {io} from 'socket.io-client'
import store from './store';

const socket = io('ws://');
let tasks = [];

socket.on('connect', () => {
    socket.on('getTasks', (list) => {
        tasks = list;
        store.dispatch({
            type: 'updateTasks',
            list: list
        });
    });

    socket.on('connect_error', (err) => {
        console.log('error', err);
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
    })
});

const Tasks = {
    getTasks() {
        return tasks;
    },

    createSection() {
        const fakeSection = {
            name: 'English'
        };
        socket.emit('createSection', fakeSection);
    }
}

export default Tasks;