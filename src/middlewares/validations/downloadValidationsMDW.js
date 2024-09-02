const { body } = require('express-validator');

const downloadValidationsMDW = [
    body('text')
        .notEmpty().withMessage('Debes completar el texto del enlace de descarga').bail()
        .isLength({min:2}).withMessage("El texto del enlace de descarga debe tener al menos 2 caracteres").bail(),
    body('type')
        .notEmpty().withMessage('Debes Seleccionar el tipo de sección').bail(),
    body('content')
        .notEmpty().withMessage('Debes Seleccionar el tipo de contenido').bail(),
    body('link')
        .notEmpty().withMessage('Debes completar el enlace de descarga').bail()
        .isLength({min:2}).withMessage("El enlace de descarga debe tener al menos 2 caracteres").bail()
        .isURL().withMessage('Debes ingresar un enlace de descarga valido'),
]
module.exports = downloadValidationsMDW