//Middleware de configuración de multer para rutas de usuarios
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    
    destination: function(req, file, cb){
        let {courseID, classID, topicID} = req.params;
        let uploadPath = path.join(__dirname, "../../../public/images", courseID, classID, topicID);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath)
    },

    filename: function(req,file, cb){
        let {title} = req.body;
        title = title.split(' ').join('_');
        let newFileName =  `${title}_${Date.now()}${path.extname(file.originalname)}`
        cb(null, newFileName)
    }
})

const upload = multer({storage})

module.exports = upload