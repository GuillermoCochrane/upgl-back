const { body } = require('express-validator');

const classesValidations = [
    body('summary')
        .notEmpty().withMessage('Debes completar el nombre de la clase').bail()
        .isLength({min:2, max:40}).withMessage("El nombre de la clase debe tener entre 2 y 40 caracteres"),
    body('title')
        .notEmpty().withMessage('Debes completar el resumen de la clase').bail()
]
module.exports = classesValidations