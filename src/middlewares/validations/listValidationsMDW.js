const { body } = require('express-validator');

const listValidationsMDW = [
    body('type')
        .notEmpty().withMessage('Debes seleccionar un tipo de lista').bail()
        .custom((value, {req}) => {
            if(value != "ul" && value != "ol"){
                throw new Error("Las listas deben ser de tipo ol o ul");
            } 
            return true
        }) 
]

module.exports = listValidationsMDW