const SchemaEvent = require('./../schemas/SchemaEvent');

const Events = {
    getList() {
        return new Promise((resolve, reject) => {
            const list = [
            ];

            resolve(list);
        })
    }
}

module.exports = Events;