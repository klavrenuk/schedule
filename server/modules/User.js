const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {validationItem} = require('./../middlewares/validation');
const bcrypt = require("bcryptjs");

const ModelUser = mongoose.model('User', new Schema({
    _id: {
        type: Schema.ObjectId,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}));

const isExistUser = (user) => {
    return new Promise((resolve, reject) => {
        if(!user) {
            reject();

        } else {
            ModelUser.findOne({
                login: user.login
            }, (err, item) => {
                if(err) {
                    reject(err);
                }

                if(item) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        }
    })
}

const User = {
    async create(request, response) {
        let status = 200;

        try {
            if(!request.body) {
                status = 400;
                throw new Error('Bad request');
            }

            const requiredOptions = [
                {
                    prop: 'name',
                    type: 'text'
                },
                {
                    prop: 'login',
                    type: 'text'
                },
                {
                    prop: 'password',
                    type: 'text'
                },
                {
                    prop: 'passwordRepeat',
                    type: 'text'
                }
            ];

            const validation = validationItem(requiredOptions, request.body);
            if(!validation.value) {
                status = 400;
                throw new Error(validation.message);
            }

            if(request.body.password !== request.body.passwordRepeat) {
                status = 400;
                throw new Error("Passwords don't match");
            }

            const isExist = await isExistUser(request.body);
            if(isExist) {
                response.status(status).json({
                    status: false,
                    message: 'User already exist'
                });
                return false;
            }

            const hasPassword = await bcrypt.hash(request.body.password, 10);
            const user = new ModelUser({
                name: request.body.name,
                login: request.body.login,
                password: hasPassword
            });

            user.save((err) => {
                if(err) {
                    throw new Error(err);
                }

                response.status(200).json({
                    status: true
                })
            })

        } catch (err) {
            console.error(err);

            if(status === 200) {
                status = 500;
            }

            response.status(status).json({
                errorMessage: err.message || null
            });
        }
    },

    getUser(response) {
        try {
            ModelUser.findOne({
                _id: '623220b9d3664625b857daa5'
            }, (err, item) => {
                if(err) {
                    throw new Error(err);
                }

                response.json({
                    name: item.name,
                    login: item.login,
                    id: item._id
                })
            })

        } catch(err) {
            console.error(err);
            response.sendStatus(500);
        }
    }
}

module.exports = User;