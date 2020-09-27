const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    id: { type: Number },
    nom: { type: String },
    prenom: { type: String },
    email: { type: String },
    password: { type: Number },

});

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);