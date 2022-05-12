const SchemaEvent = require('../schemas/SchemaEvent');
const {validationItem, isObject} = require('./../middlewares/validation');

const Event = {
    edit(event) {
        return new Promise((resolve, reject) => {
            SchemaEvent.findOneAndUpdate(
                {_id: event._id},
                event, (err) => {
                    if(err) {
                        reject(err);
                    }

                    resolve(true);
                }
            )
        })
    },

    add(event) {
        return new Promise((resolve, reject) => {
            event.save((err) => {
                if(err) {
                    reject(err);
                }

                resolve(true);
            })
        })
    },

    async save(request, response) {
        let status = 200;

        try {
            if(!request.body && !isObject(request.body)) {
                status = 400;
                throw new Error('Bad request');
            }

            const requiredOptions = [
                {
                    prop: 'name',
                    type: 'String'
                }
            ];
            const validation = validationItem(requiredOptions, request.body);
            
            if(!validation.value) {
                status = 400;
                throw new Error(validation.message);
            }

            if(!request.body.date.start) {
                status = 400;
                throw new Error('Date start is undefined');
            }

            if(request.body.date.isAllDay) {
                request.body.date.end = request.body.date.start;

            } else {
                if(!request.body.date.end) {
                    status = 400;
                    throw new Error('Date end is undefined');
                }
            }

            const event = new SchemaEvent({
                name: request.body.name,
                description: request.body.description || '',
                start: new Date(request.body.date.start).getTime(),
                end: new Date(request.body.date.end).getTime(),
                isDeleted: false,
                isAllDay: request.body.isAllDay || false
            });

            if(request.method === 'POST') {
                await this.add(event);
            } else {
                await this.edit(event);
            }

            response.sendStatus(200);

        } catch(err) {
            console.error(err);

            if(status === 200) {
                status = 500;
            }

            response.status(status).json({
                errorMessage: err.message || null
            });
        }
    },
}

module.exports = Event;