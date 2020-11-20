const joi = require('joi');

const schema = joi.object({
    titre: joi.string().min(2).max(50),
    contenu: joi.string().min(2),
});

module.exports = schema;