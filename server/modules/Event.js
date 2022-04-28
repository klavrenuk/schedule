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
                },
                {
                    prop: 'date',
                    type: 'Number'
                }
            ];
            const validation = validationItem(requiredOptions, request.body);
            
            if(!validation.value) {
                status = 400;
                throw new Error(validation.message);
            }

            const event = new SchemaEvent({
                name: request.body.name,
                description: request.body.description || '',
                date: request.body.date,
                isDeleted: false
            });

            if(request.method === 'POST') {
                await this.add(event);
            } else {
                await this.edit(event);
            }

            response.sendStatus(200);

        } catch(err) {
            console.error(err);

            if(err === 200) {
                err = 500;
            }

            response.status(status).json({
                errorMessage: err.message || null
            });
        }
    },
}

module.exports = {Event};