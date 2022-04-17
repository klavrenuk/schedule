const Section = require('./Section');

const Sections = {
    getList() {
        return new Promise((resolve, reject) => {
            Section.ModelSection.find({}, (err, arr) => {
                if(err) {
                    console.error(err);
                    reject(err);
                }

                resolve(arr);
            })
        })
    },
}

module.exports = Sections;