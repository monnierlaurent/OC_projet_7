const joi = require('joi');

const schema = joi.object({

    comContenu: joi.string().min(2).max(255),
});

module.exports = schema;