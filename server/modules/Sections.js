const SchemaSection = require('./../schemas/SchemaSection')

const Sections = {
    getList() {
        return new Promise((resolve, reject) => {
            SchemaSection.find({}, (err, arr) => {
                if(err) {
                    console.error(err);
                    reject(err);
                }

                resolve(arr);
            }).sort({'_id': -1})
        })
    },
}

module.exports = Sections;