const sendError = (message, socket = null, ) => {
    if(socket) {
        socket.emit('action_error', message);
    }
}

process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
});

process.on('unhandledrejection', (err) => {
    console.log(err);
    process.exit(1);
});

module.exports = {sendError};