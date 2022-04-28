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
    date: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
}));

module.exports = {SchemaEvent};