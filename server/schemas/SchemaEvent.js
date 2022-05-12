const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaEvent = mongoose.model('Event', new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
    isAllDay: {
        type: Boolean,
        required: false,
        default: false
    }
}));

module.exports = SchemaEvent;