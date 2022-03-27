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
            socket.emit('getTasks', list);
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