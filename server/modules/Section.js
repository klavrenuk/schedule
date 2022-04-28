const SchemaSection = require('./../schemas/SchemaSection');

const Section = {
    create(name) {
        return new Promise((resolve, reject) => {

            const section = new SchemaSection({
                name: name
            });
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

            SchemaSection.findByIdAndDelete(
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

module.exports = Section;