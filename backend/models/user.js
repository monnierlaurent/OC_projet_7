const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userId: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);