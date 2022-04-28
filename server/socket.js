const Section = require('./modules/Section');
const Task = require('./modules/Task');
const Tasks = require('./modules/Tasks');
const Sections = require('./modules/Sections');
const Events = require('./modules/Events');

const {sendErrorSocket} = require('./middlewares/error');
const {createListTasks} = require('./middlewares/create-list');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('connected', socket.id);

        socket.on('disconnect', (reason) => {
            console.log('disconnect', socket.id, reason);
        });
        
        socket.on('createSection', (name) => createSection(name));

        socket.on('deleteSection', (id) => deleteSection(id));

        socket.on('getTasks', (type) => sendList('tasks', type));

        socket.on('createTask', (task) => createTask(task));

        socket.on('deleteTask', (task) => deleteTask(task));

        socket.on('editTask', (task) => editTask(task));

        socket.on('sendEvents', () => sendList('events'));


        const sendList = async (type, subType) => {
            let list = [],
                eventName = null;

            try {
                switch (type) {
                    case 'events':
                        list = await Events.getList();
                        break;

                    case 'tasks':
                        const sections = await Sections.getList();
                        const tasks = await Tasks.getList(type);

                        list = createListTasks(sections, tasks, subType);
                        eventName = 'listTasksUpdated';
                        break;

                }
            } catch(err) {
                console.log(err);
            } finally {
                if(eventName) {
                    socket.emit(eventName, list);
                }
            }
        }

        const createSection = async (name) => {
            try {
                await Section.create(name);
                sendList('tasks');

            } catch (err) {
                console.log(err);
                sendErrorSocket(err, socket);
            }
        }

        const deleteSection = async (id) => {
            try {
                await Section.delete(id);
                sendList('tasks');

            } catch (err) {
                console.log(err);
                sendErrorSocket(err, socket);
            }
        }

        const createTask = async (task) => {
            try {
                await Task.create(task);
                sendList('tasks');

            } catch (err) {
                console.log(err);
                sendErrorSocket(err, socket);
            }
        }

        const deleteTask = async(task) => {
            try {
                await Task.delete(task);
                sendList('tasks');

            } catch (err) {
                console.log(err);
                sendErrorSocket(err, socket);
            }
        }

        const editTask = async (task) => {
            try {
                await Task.edit(task);

            } catch (err) {
                console.log(err);
                sendErrorSocket(err, socket);
            }
        }
    });
}