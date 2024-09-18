const { body } = require('express-validator');

const pValidationsMDW = [
    body('type')
        .notEmpty().withMessage('Debes seleccionar un tipo de elemento').bail()
        .custom((value, {req}) => {
            if(value != "p"){
                throw new Error("El tipo de contenido debe ser párrafo (p)");
            } 
            return true
        }) 
]
module.exports = pValidationsMDW