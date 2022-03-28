const Section = require('./modules/Section');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('connected', socket.id);

        socket.on('disconnect', (reason) => {
            console.log('disconnect', reason);
        });
        
        socket.on('createSection', (section) => {
            createSection(section);
        });

        socket.on('getTasks', () => {
            sendTasks();
        });

        const sendTasks = async() => {
            const list = await Section.getList();

            const fakeList = [
                {
                    name: 'English',
                    _id: 1,
                    tasks: [
                        {
                            _id: 1,
                            sectionId: 1,
                            isChecked: false,
                            name: 'Task#1'
                        },
                        {
                            _id: 2,
                            sectionId: 1,
                            isChecked: false,
                            name: 'Task#2'
                        },
                        {
                            _id: 3,
                            sectionId: 1,
                            isChecked: false,
                            name: 'Task#3'
                        }
                    ]
                },
                {
                    name: 'Travel',
                    _id: 2,
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
            ]

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

        sendTasks();
    });
}