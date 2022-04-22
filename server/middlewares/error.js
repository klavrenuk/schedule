const getMessage = (err, customErrorMessage) => {
    if(customErrorMessage) {
        return customErrorMessage;
    }

    switch (err) {
        default:
            return 'Error! Please, try again';
    }
}

const sendErrorSocket = (err, socket = null, customErrorMessage) => {
    if(socket) {
        socket.emit('action_error', getMessage(err, customErrorMessage));
    }
}

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledrejection', (err) => {
    console.error(err);
});

module.exports = {sendErrorSocket};