const Section = require('./modules/Section').Section;
const Task = require('./modules/Task').Task;
const Tasks = require('./modules/Tasks');
const Sections = require('./modules/Sections');
const {sendError} = require('./middlewares/error');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('connected', socket.id);

        socket.on('disconnect', (reason) => {
            console.log('disconnect', socket.id, reason);
        });
        
        socket.on('createSection', (section) => createSection(section));

        socket.on('deleteSection', (id) => deleteSection(id));

        socket.on('updateTask', () => sendTasks());

        socket.on('createTask', (task) => createTask(task));

        socket.on('deleteTask', (task) => deleteTask(task));

        socket.on('editTask', (task) => editTask(task));

        const sendTasks = async() => {
            let list = [];

            try {
                const sections = await Sections.getList();
                const tasks = await Tasks.getList();

                list = sections.map((section) => {
                    return {
                        ...section._doc,
                        tasks: tasks.filter((task) => {
                            if(section._id.toString() === task.sectionId.toString()) {
                                return task;
                            }
                        })
                    }
                });

            } catch(err) {
                console.error(err);

            } finally {
                socket.emit('getTasks', list);
            }

        };

        const createSection = async (section) => {
            try {
                await Section.create(section);
                sendTasks();

            } catch (err) {
                sendError(err, socket);
            }
        }

        const deleteSection = async (id) => {
            try {
                await Section.delete(id);
                sendTasks();

            } catch (err) {
                sendError();
            }
        }

        const createTask = async (task) => {
            try {
                await Task.create(task);

            } catch (err) {
                sendError(err, socket);
            }
        }

        const deleteTask = async(task) => {
            try {
                await Task.delete(task);
                sendTasks()

            } catch (err) {
                sendError(err, socket);
            }
        }

        const editTask = async (task) => {
            try {
                await Task.edit(task);
            } catch (err) {
                sendError(err, socket);
            }
        }

        sendTasks();
    });
}