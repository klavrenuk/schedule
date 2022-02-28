const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


app.use(express.Router());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('router')(app);

mongoose.connect('mongodb://localhost:27017/stockmarket', function(err) {
    if(err) {
        return console.log('Connection error to database');

    } else {
        app.listen(9000, () => {
            console.log('Server listening');
        });
    }
})