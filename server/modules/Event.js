const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {validationItem, isObject} = require('./../middlewares/validation');

const ModelEvent = mongoose.model('Event', new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
}));

const Event = {
    add(request, response) {
        let status = 200;

        try {
            console.log('in method add');
            console.log(request.body);


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
            console.log('validation', validation);
            
            if(!validation.value) {
                status = 400;
                throw new Error(validation.message);
            }

            const event = new ModelEvent({
                name: request.body.name,
                description: request.body.description || '',
                date: request.body.date,
                isDeleted: false
            });

            event.save((err) => {
                if(err) {
                    status = 500;
                    trow new Error();
                }

                response.sendStatus(200);
            })

        } catch(err) {
            console.log(err);
            console.log(status);

            response.status(status).json({
                errorMessage: err.message || null
            });
        }
    },

    edit(request, response) {

    }
}

module.exports = Event;