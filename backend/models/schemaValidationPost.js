const joi = require('joi');

const schema = joi.object({
    titre: joi.string().min(3).max(50),
    contenu: joi.string().min(3),
});

module.exports = schema;