const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSection = mongoose.model('Section', new Schema({
    name: {
        type: String,
        required: true
    }
}));

const Section = {
    create(item) {
        return new Promise((resolve, reject) => {
            const section = new ModelSection(item);

            section.save((err) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }

                resolve(true);
            })
        })
    }
}

module.exports = {Section, ModelSection};