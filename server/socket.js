const Section = require('./modules/Section');
const Task = require('./modules/Task');

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
            console.log('task deleted', task)
        });

        socket.on('createTask', (task) => {
            createTask(task);
        })

        const sendTasks = async() => {
            const list = await Section.getList();

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
                            _id: 3,
                            sectionId: 2,
                            isChecked: false,
                            name: 'Task#3'
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
                //sendTasks();

            } catch (err) {
                console.log('section error create task');
                console.log(err);
            }
        }

        sendTasks();
    });
}