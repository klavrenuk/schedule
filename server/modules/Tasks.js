const Task = require('./Task');

const Tasks = {
    getList() {
        return new Promise((resolve, reject) => {
            Task.ModelTask.find({}, (err, list) => {
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