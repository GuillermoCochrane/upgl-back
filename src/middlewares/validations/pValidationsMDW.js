const { body } = require('express-validator');

const pValidationsMDW = [
    body('text')
        .notEmpty().withMessage('Debes completar el título').bail()
        .isLength({min:2}).withMessage("El título debe tener al menos 2 caracteres").bail(),
    body('type')
        .notEmpty().withMessage('Debes Seleccionar el tipo de sección').bail(),
    body('content')
        .notEmpty().withMessage('Debes Seleccionar el tipo de contenido').bail(),
]
module.exports = pValidationsMDW