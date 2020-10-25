const mongoose = require('mongoose');


const comSchema = mongoose.Schema({

    userId: { type: Number, required: true },
    postId: { type: Number, required: true },
    comAuteur: { type: String, required: true },
    comContenu: { type: String, required: true },
    comDateCrea: { type: String, required: true },
    comDateModif: { type: String, required: true },
    comLikes: { type: Number, default: 0, required: true },
    comDislikes: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model('com', comSchema);