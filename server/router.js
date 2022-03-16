const User = require('./modules/User');
const Event = require('./modules/Event');

const REGISTRATION = '/api/registration';
const EVENT = '/api/event';

module.exports = (app) => {
    app.post(EVENT, (request, response) => Event.save(request, response));
    app.put(EVENT, (request, response) => Event.save(request, response));

    app.post(REGISTRATION, (request, response) => User.create(request, response));
}