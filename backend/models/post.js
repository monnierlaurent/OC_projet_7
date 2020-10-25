const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    dateCrea: { type: String, required: true },
    dateModif: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0, required: true },
    dislikes: { type: Number, default: 0, required: true },
});



module.exports = mongoose.model('post', postSchema);