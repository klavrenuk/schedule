const Section = require('./modules/Section');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('connected', socket.id);

        socket.join('tasks');

        socket.on('disconnect', (reason) => {
            console.log('disconnect', reason);
        });
        
        socket.on('tasks', (data) => {
            console.log('onTasks');
            console.log('item', data);
        })

        sendTasks();
    });

    const sendTasks = async() => {
        console.log('function sendTasks');
        const list = await Section.getList();

        console.log('function = sendTasks', list);

        io.to('tasks').emit('tasks', list);

    }
}