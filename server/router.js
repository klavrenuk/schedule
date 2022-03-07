const Event = require('./modules/Event');

const EVENT = '/api/event';

module.exports = (app) => {
    app.post(EVENT, (request, response) => Event.add(request, response));
}