const { body } = require('express-validator');

const topicValidations = [
    body('title')
        .notEmpty().withMessage('Debes completar el titulo del tema').bail()
        .isLength({min:2, max:35}).withMessage("El titulo del tema debe tener entre 2 y 35 caracteres"),
]
module.exports = topicValidations