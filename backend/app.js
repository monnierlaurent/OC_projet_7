const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
//const mongoose = require('mongoose');
//const path = require('path');

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
//app.use('/api/post', postRoutes);

app.use('*', (req, res) => {
    res.status(400).json({ error: 'code erreur 404' });
});

module.exports = app;