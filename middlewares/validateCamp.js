const { response } = require("express");
const { validationResult } = require("express-validator");


const validateCamp = (req , res = response , next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()[0].msg
        })
    }

    next()

}

module.exports = {
    validateCamp
}