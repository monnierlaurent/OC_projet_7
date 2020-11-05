const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema
    .is().min(8)
    .has().uppercase(1)
    .has().lowercase()
    .has().digits(1)


module.exports = schema;