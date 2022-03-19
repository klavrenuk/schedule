const User = require('./modules/User');
const Event = require('./modules/Event');

const REGISTRATION = '/api/registration';
const WHOIAM = '/api/who-i-am';
const EVENT = '/api/event';

module.exports = (app) => {
    app.post(REGISTRATION, (request, response) => User.create(request, response));

    app.get(WHOIAM, (request, response) => User.getUser(response));

    app.post(EVENT, (request, response) => Event.save(request, response));
    app.put(EVENT, (request, response) => Event.save(request, response));
}