const { body } = require('express-validator');

const linkValidationsMDW = [
    body('text')
        .notEmpty().withMessage('Debes completar el texto del enlace').bail()
        .isLength({min:2}).withMessage("El texto del enlace debe tener al menos 2 caracteres").bail(),
    body('type')
        .notEmpty().withMessage('Debes Seleccionar el tipo de sección').bail(),
    body('content')
        .notEmpty().withMessage('Debes Seleccionar el tipo de contenido').bail(),
    body('link')
        .notEmpty().withMessage('Debes completar el enlace').bail()
        .isLength({min:9}).withMessage("El enlace debe tener al menos 9 caracteres").bail()
        .isURL().withMessage('Debes ingresar un enlace valido'),
]
module.exports = linkValidationsMDW