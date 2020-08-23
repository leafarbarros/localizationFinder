const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config();
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

// App
const app = express();
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true 
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log('Mongoose default connection has occured \n${err}');
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Models
const Users = require('./models/users');
const Location = require('./models/locations');

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const usersRoutes = require('./routes/users-routes');
app.use('/users', usersRoutes);

const authRoutes = require('./routes/authentication-routes');
app.use('/auth', authRoutes);

const locationRoutes = require('./routes/locations-routes');
app.use('/locations', locationRoutes);

module.exports = app;