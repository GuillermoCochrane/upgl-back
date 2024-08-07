const { body } = require('express-validator');

const classesValidations = [
    body('summary')
        .notEmpty().withMessage('Debes completar el titulo del índice').bail()
        .isLength({min:2, max:35}).withMessage("El nombre del índice debe tener entre 2 y 35 caracteres"),
    body('title')
        .notEmpty().withMessage('Debes completar el título de la clase').bail()
        .isLength({min:2}).withMessage("El título de la clase debe tener al menos 2 caracteres"),
]
module.exports = classesValidations