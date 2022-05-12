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
        type: Number,
        required: true
    },
    end: {
        type: Number,
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