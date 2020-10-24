const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    emailMask: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateInscrip: { type: String, required: true },
    role: { type: Number, required: true }

});

module.exports = mongoose.model('user', userSchema);