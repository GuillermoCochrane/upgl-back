const { body } = require('express-validator');

const liValidationsMDW = [
    body("type")
        .notEmpty().withMessage("Debes seleccionar un tipo de elemento").bail(),
    body("text")
        .notEmpty().withMessage("Debes incluir un texto").bail()
        .isLength({min:2}).withMessage("El texto debe tener al menos 2 caracteres").bail(),
    body("content")
        .notEmpty().withMessage("Debes seleccionar un tipo de contenido").bail(),
]

module.exports = liValidationsMDW