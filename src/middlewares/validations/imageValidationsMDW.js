//Middleware de configuración de express-validator para rutas de usuarios, para imagen de perfil
const path = require('path');
const { body } = require('express-validator');

const imageValidations = [
    body('title')
            .notEmpty().withMessage("Debes incluir un título").bail()
            .isLength({ min: 2 }).withMessage("El título debe tener al menos 2 caracter").bail()
            .isLength({ max: 30 }).withMessage("El título no puede tener más de 30 caracteres"),
    body('alt')
        .notEmpty().withMessage("Debes incluir un texto alternativo").bail()
        .isLength({ min: 2 }).withMessage("El texto alternativo debe tener al menos 2 caracter").bail()
        .isLength({ max: 50 }).withMessage("El texto alternativo no puede tener más de 50 caracteres"),
    body('type')
        .notEmpty().withMessage('Debes seleccionar el tipo de contenido').bail(),
    body('image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExt = [".bpm", ".png", ".jpg", ".gif", ".webp", ".svg"];
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
module.exports = imageValidations