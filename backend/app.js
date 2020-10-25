const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const path = require('path');
//const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('*', (req, res) => {
    res.status(400).json({ error: 'Cette route n\'existe pas !!' });
});

module.exports = app;