const path = require('path');
const { body } = require('express-validator');

const localFliesValidationsMDW = [
    body('text')
        .notEmpty().withMessage('Debes completar el texto del enlace de descarga').bail()
        .isLength({min:2}).withMessage("El texto del enlace de descarga debe tener al menos 2 caracteres").bail(),
    body('type')
        .notEmpty().withMessage('Debes seleccionar el tipo de contenido').bail(),
    body('file').custom((value, {req}) => {
        let file = req.file;
        let acceptedExt = [".zip", ".rar", ".pdf", ".txt", ".md", ".docx", ".xlsx", ".pptx",];
        if(!file){
            throw new Error("Debes incluir la imagen");
        } else {
            let ext = path.extname(file.originalname)
            if(!acceptedExt.includes(ext)){
                throw new Error("El formato del archivo es incompatible");
            }
        }
        return true
    }) 
]
module.exports = localFliesValidationsMDW