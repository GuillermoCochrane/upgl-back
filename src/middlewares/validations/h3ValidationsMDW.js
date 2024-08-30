const { body } = require('express-validator');

const h3ValidationsMDW = [
    body('text')
        .notEmpty().withMessage('Debes completar el título').bail()
        .isLength({min:2}).withMessage("El título debe tener al menos 2 caracteres").bail()
        .isLength({max:35}).withMessage("El título debe tener como máximo 35 caracteres"),
    body('type')
        .notEmpty().withMessage('Debes Seleccionar el tipo de sección').bail(),
    body('content')
        .notEmpty().withMessage('Debes Seleccionar el tipo de contenido').bail(),
]
module.exports = h3ValidationsMDW