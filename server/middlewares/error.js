const sendError = (message, socket = null, ) => {
    if(socket) {
        socket.emit('action_error', message);
    }
}

module.exports = {sendError};