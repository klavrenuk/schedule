const Section = require('./modules/Section');
const Task = require('./modules/Task').Task;
const Tasks = require('./modules/Tasks');
const Sections = require('./modules/Sections');
const {sendError} = require('./middlewares/error');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('connected', socket.id);

        socket.on('disconnect', (reason) => {
            console.log('disconnect', reason);
        });
        
        socket.on('createSection', (section) => {
            createSection(section);
        });

        socket.on('updateTask', () => {
            sendTasks();
        });

        socket.on('deleteTask', (task) => {
            deleteTask(task);
        });

        socket.on('createTask', (task) => {
            createTask(task);
        })

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
                console.log(err);
            }
        }

        const createTask = async (task) => {
            try {
                await Task.create(task);

            } catch (err) {
                console.log(err);
                sendError(err, socket);
            }
        }

        const deleteTask = async(task) => {
            try {
                await Task.delete(task);
                sendTasks()

            } catch (err) {
                console.log(err);
                sendError(err, socket);
            }
        }

        sendTasks();
    });
}