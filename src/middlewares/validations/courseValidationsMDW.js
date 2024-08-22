const { body } = require('express-validator');
// agregar validacion de curso repetido
const courseValidations = [
    body('name')
        .notEmpty().withMessage('Debes completar el nombre del curso').bail()
        .isLength({min:2}).withMessage("El nombre del curso debe tener al menos 2 caracteres").bail()
        .isLength({max:15}).withMessage("El nombre del curso debe tener como máximo 15 caracteres"),
    body("intro").notEmpty().withMessage("Debes completar lae introducción del curso").bail()
        .isLength({min:2}).withMessage("La introducción del curso debe tener al menos 2 caracteres").bail()
        .isLength({max:150}).withMessage("La introducción del curso debe tener como máximo 150 caracteres"),
    body("paragraph").isLength({max:200}).withMessage("La descripción del curso debe tener como máximo 200 caracteres"),
]
module.exports = courseValidations