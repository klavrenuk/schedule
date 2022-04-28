const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaTask = mongoose.model('Task', new Schema({
    name: {
        type: String,
        required: true
    },
    sectionId: {
        type: Schema.ObjectId,
        required: true
    },
    isChecked: {
        type: Boolean
    }
}));

module.exports = SchemaTask;