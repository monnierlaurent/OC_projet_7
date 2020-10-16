const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    pseudo: { type: String, required: true },
    emailMask: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },

});

module.exports = mongoose.model('user', userSchema);