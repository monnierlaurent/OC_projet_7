const joi = require('joi');

const schema = joi.object({

    comContenu: joi.string().min(2),
});

module.exports = schema;