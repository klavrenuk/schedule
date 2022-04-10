const sendError = (message, socket = null, ) => {
    if(socket) {
        socket.emit('action_error', message);
    }
}

process.on('uncaughtException', (err) => {
    console.log(err);
});

process.on('unhandledrejection', (err) => {
    console.log(err);
});

module.exports = {sendError};