const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSection = mongoose.model('Section', new Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
}));

const Section = {
    getList() {
        return new Promise((resolve, reject) => {
            ModelSection.find({}, (err, arr) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }

                console.log(arr);

                console.log('before timeout');
                setTimeout(() => {
                    console.log('timeout');
                    resolve(arr);
                }, 2000);
            })
        })
    },

    create(item) {
        return new Promise((resolve, reject) => {
            const section = new ModelSection(item);
            section.save((err) => {
                if(err) {
                    console.log('err', err);
                    reject(err);
                }

                resolve(true);
            })
        })
    }
}

module.exports = Section;