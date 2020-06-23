const Validator = require('validator');
const isEmpty = require('is-empty');

//a validator function to validate inputs from register form

const validateRegister = (data) => {
    let errors  = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //check for name
    if(Validator.isEmpty(data.name)) {
        errors.name = "Name must not be empty!"
    }

    //check for email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email must not be empty!"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Must be a valid email address!"
    }

    //check for password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password must not be empty!"
    } else if (!Validator.isLength(data.password,{min: 6, max: 20} )) {
        errors.password = "Password must be at least 6 characters and maximum 20 characters!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegister;