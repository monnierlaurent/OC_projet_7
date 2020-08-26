const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: String, required: true },
    usersDisliked: { type: String, required: true }
});


module.exports = mongoose.model('objSchema', messageSchema);