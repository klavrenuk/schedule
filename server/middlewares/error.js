const sendError = (err, socket = null, ) => {
    if(socket) {
        socket.emit('action_error', err.message);
    }
}

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledrejection', (err) => {
    console.error(err);
});

module.exports = {sendError};