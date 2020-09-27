const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    id: { type: Number },
    titre: { type: String },
    auteur: { type: String },
    contenu: { type: String },

});



module.exports = mongoose.model('post', postSchema);