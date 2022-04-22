const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {validationItem} = require('./../middlewares/validation');

const ModelTask = mongoose.model('Task', new Schema({
    name: {
        type: String,
        required: true
    },
    sectionId: {
        type: Schema.ObjectId,
        required: true
    },
    isChecked: {
        type: Boolean
    }
}));

const validationTask = (task) => {
    const requiredOptions = [
        { prop: 'name', type: 'text'},
    ];

    const validation = validationItem(requiredOptions, task);
    if(!validation.value) {
        return {
            value: false,
            message: validation.message
        };
    }

    if(!task.hasOwnProperty('sectionId')) {
        return {
            value: false,
            message: 'sectionId is required'
        };
    }

    return {
        value: true,
        message: null
    };
};

const checkItem = (item) => {
    if(item && item.hasOwnProperty('_id')) {
        return true;
    } else {
        return false;
    }
};

const Task = {
    create(item) {
        return new Promise((resolve, reject) => {

            const validation = validationTask(item, true);

            if(!validation.value) {
                reject(validation.message);
                return false;
            }

            const task = new ModelTask({
                name: item.name,
                sectionId: item.sectionId,
                isChecked: item.isChecked || false
            });

            task.save((err) => {
                if(err) {
                    reject(err);
                }

                resolve(true);
            });
        })
    },

    delete(task) {
        return new Promise((resolve, reject) => {
            if(!checkItem(task)) {
                reject('Bad request');
                return false;
            }

            ModelTask.findByIdAndDelete({_id: task._id}, (err) => {
                if(err) {
                    reject(err);
                    return false;
                }

                resolve(true);
            })
        })
    },

    edit(task) {
        return new Promise((resolve, reject) => {
            if(!checkItem(task)) {
                reject('Bad request');
                return false;
            }

            const validation = validationTask(task, true);
            if(!validation.value) {
                reject(validation.message);
                return false;
            }

            ModelTask.findOneAndUpdate(
                {_id: task._id}, task, (err) =>
                {
                    if(err) {
                        reject(err);
                    }

                    resolve(true);
                }
            )
        })
    }
}

module.exports = {Task, ModelTask};