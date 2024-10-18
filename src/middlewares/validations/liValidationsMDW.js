const { body } = require('express-validator');

const liValidationsMDW = [
    body("type")
        .notEmpty().withMessage("Debes seleccionar un tipo de elemento").bail(),
    body("text")
        .notEmpty().withMessage("Debes incluir un texto").bail()
        .isLength({min:3}).withMessage("El texto debe tener al menos 3 caracteres").bail(),
    body("content")
        .notEmpty().withMessage("Debes seleccionar un tipo de contenido").bail(),
]

module.exports = liValidationsMDW