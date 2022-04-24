const Task = require('./Task');

const Tasks = {
    getList(type) {
        return new Promise((resolve, reject) => {
            const filter = {
                isChecked: type === 'completed' ? true : false
            };

            Task.ModelTask.find(filter, (err, list) => {
                if(err) {
                    reject(err);
                    return false;
                }

                resolve(list);
            })
        })
    }
}

module.exports = Tasks;