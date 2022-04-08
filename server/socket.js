const Section = require('./modules/Section');
const Task = require('./modules/Task');
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
            const sections = await Sections.getList();
            const tasks = await Tasks.getList();

            console.log('sections', sections);
            console.log('tasks', tasks);

            const fakeList = [
                {
                    name: 'Travel',
                    _id: '62408efab4f1dc1b88ab62e4',
                    tasks: [
                        {
                            _id: 1,
                            sectionId: 2,
                            isChecked: false,
                            name: 'Task#1'
                        },
                        {
                            _id: 2,
                            sectionId: 2,
                            isChecked: false,
                            name: 'Task#2'
                        },
                        {
                            _id: '624fc8a0d286902d4496da6c',
                            sectionId: 2,
                            isChecked: false,
                            name: 'new Task'
                        }
                    ]
                }
            ];

            socket.emit('getTasks', fakeList);
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