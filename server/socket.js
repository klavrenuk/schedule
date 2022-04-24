const Section = require('./modules/Section').Section;
const Task = require('./modules/Task').Task;
const Tasks = require('./modules/Tasks');
const Sections = require('./modules/Sections');
const {sendErrorSocket} = require('./middlewares/error');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('connected', socket.id);

        socket.on('disconnect', (reason) => {
            console.log('disconnect', socket.id, reason);
        });
        
        socket.on('createSection', (name) => createSection(name));

        socket.on('deleteSection', (id) => deleteSection(id));

        socket.on('getTasks', (type) => sendTasks(type));

        socket.on('createTask', (task) => createTask(task));

        socket.on('deleteTask', (task) => deleteTask(task));

        socket.on('editTask', (task) => editTask(task));

        const sendTasks = async(type) => {
            let list = [];

            try {
                const sections = await Sections.getList();
                const tasks = await Tasks.getList(type);

                sections.forEach((section) => {
                    const itemSection = {
                        ...section._doc,
                        tasks: tasks.filter((task) => {
                            if(section._id.toString() === task.sectionId.toString()) {
                                return task;
                            }
                        })
                    }

                    if(type === 'completed') {
                        if(itemSection.tasks && itemSection.tasks.length > 0) {
                            list.push(itemSection);
                        }

                    } else {
                        list.push(itemSection);
                    }

                });

            } catch(err) {
                console.error(err);

            } finally {
                socket.emit('listTasksUpdated', list);
            }

        };

        const createSection = async (name) => {
            try {
                await Section.create(name);
                sendTasks();

            } catch (err) {
                console.log(err);
                sendErrorSocket(err, socket);
            }
        }

        const deleteSection = async (id) => {
            try {
                await Section.delete(id);
                sendTasks();

            } catch (err) {
                console.log(err);
                sendErrorSocket(err, socket);
            }
        }

        const createTask = async (task) => {
            try {
                await Task.create(task);
                sendTasks();

            } catch (err) {
                console.log(err);
                sendErrorSocket(err, socket);
            }
        }

        const deleteTask = async(task) => {
            try {
                await Task.delete(task);
                sendTasks()

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

        sendTasks();
    });
}