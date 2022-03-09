const Event = require('./modules/Event');

const EVENT = '/api/event';

module.exports = (app) => {
    app.post(EVENT, (request, response) => Event.save(request, response));
    app.put(EVENT, (request, response) => Event.save(request, response));
}