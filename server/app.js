const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require("express-session");


app.use(express.Router());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());


require('./router')(app);

mongoose.connect('mongodb://localhost:27017/schedule', function(err) {
    if(err) {
        return console.log('Connection error to database');

    } else {
        app.listen(9000, () => {
            console.log('Server listening');
        });
    }
})