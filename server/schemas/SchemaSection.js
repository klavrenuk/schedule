const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaSection = mongoose.model('Section', new Schema({
    name: {
        type: String,
        required: true
    }
}));

module.exports = SchemaSection;