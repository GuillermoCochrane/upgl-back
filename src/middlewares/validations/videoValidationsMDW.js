//Middleware de configuración de express-validator para rutas de usuarios, para imagen de perfil
const path = require('path');
const { body } = require('express-validator');

const videoValidationsMDW = [
    body('title')
            .notEmpty().withMessage("Debes incluir un título").bail()
            .isLength({ min: 3 }).withMessage("El título debe tener al menos 3 caracteres").bail()
            .isLength({ max: 30 }).withMessage("El título no puede tener más de 30 caracteres"),
    body('type')
        .notEmpty().withMessage('Debes seleccionar el tipo de contenido').bail(),
    body('video').custom((value, {req}) => {
        let file = req.file;
        let acceptedExt = [".avi", ".mp4", ".webm", ".mpg", ".mov"];
        if(!file){
            throw new Error("Debes incluir un video");
        } else {
            let ext = path.extname(file.originalname)
            if(!acceptedExt.includes(ext)){
                throw new Error("El formato del archivo es incompatible");
            }
        }
        return true
    }) 
]
module.exports = videoValidationsMDW