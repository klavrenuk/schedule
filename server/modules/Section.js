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
                    console.error(err);
                    reject(err);
                }

                resolve(true);
            })
        })
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            if(!id) {
                reject('Bad request');
                return false;
            }

            ModelSection.findByIdAndDelete(
                {_id: id}, (err) => {
                    if(err) {
                        reject(err);
                        return false;
                    }

                    resolve(true);
                }
            )
        })
    }
}

module.exports = {Section, ModelSection};