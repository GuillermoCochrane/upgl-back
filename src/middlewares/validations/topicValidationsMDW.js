const { body } = require('express-validator');

const topicValidations = [
    body('title')
        .notEmpty().withMessage('Debes completar el titulo del tema').bail()
        .isLength({min:2}).withMessage("El título del tema debe tener al menos 2 caracteres").bail()
        .isLength({max:35}).withMessage("El título del tema debe tener como máximo 35 caracteres"),
]
module.exports = topicValidations