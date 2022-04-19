const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const socketIO = require('socket.io');
const port = process.env.PORT || 9000;

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
        console.error('Connection error to database');
        return;

    } else {
        const server = app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });

        const io = socketIO(server);
        require('./socket')(io);
    }
})