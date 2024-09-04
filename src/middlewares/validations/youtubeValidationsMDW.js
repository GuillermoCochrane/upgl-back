const { body } = require('express-validator');

const youtubeValidationsMDW = [
    body('title')
        .notEmpty().withMessage('Debes completar el título del video').bail()
        .isLength({min:2}).withMessage("El título del video debe tener al menos 2 caracteres").bail()
        .isLength({max:35}).withMessage("El título del video debe tener como máximo 35 caracteres"),
    body('type')
        .notEmpty().withMessage('Debes Seleccionar el tipo de sección').bail(),
    body('link')
        .notEmpty().withMessage('Debes completar el enlace del video').bail()
        .isLength({min:9}).withMessage("El enlace del video debe tener al menos 9 caracteres").bail()
        .isURL().withMessage('Debes ingresar un enlace valido'),
    body('width')
        .notEmpty().withMessage('Debes ingresar el ancho del video').bail()
        .isNumeric().withMessage('Debes ingresar un ancho valido').bail()
        .isLength({min:2}).withMessage("El ancho del video debe tener al menos 2 números"),
    body('height')
        .notEmpty().withMessage('Debes ingresar la altura del video').bail()
        .isNumeric().withMessage('Debes ingresar una altura valido').bail()
        .isLength({min:2}).withMessage("La altura del video debe tener al menos 2 números"),
]
module.exports = youtubeValidationsMDW