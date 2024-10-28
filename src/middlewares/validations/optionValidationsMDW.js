const { body } = require('express-validator');

const optionValidationsMDW = [
    body("text")
        .notEmpty().withMessage("Debes incluir un texto").bail()
        .isLength({min:3}).withMessage("El texto debe tener al menos 3 caracteres").bail(),
    body("content")
        .notEmpty().withMessage("Debes seleccionar un tipo de contenido").bail(),
    body("name")
        .notEmpty().withMessage("Debes incluir un nombre").bail()
        .isLength({min:3}).withMessage("El nombre debe tener al menos 3 caracteres").bail(),
    body("correct")
        .notEmpty().withMessage("Debes seleccionar si es correcto o no").bail(),
    body("answer")
        .notEmpty().withMessage("Debes incluir una respuesta").bail()
        .isLength({min:3}).withMessage("La respuesta debe tener al menos 3 caracteres").bail(),
]

module.exports = optionValidationsMDW