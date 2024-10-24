const { body } = require('express-validator');

const triviaValidationsMDW = [
    body('type')
        .notEmpty().withMessage('Debes seleccionar un tipo de elemento').bail()
        .custom((value, {req}) => {
            if(value != "trivia"){
                throw new Error('El elemento debe ser del tipo trivia');
            } 
            return true
        }) 
]
module.exports = triviaValidationsMDW