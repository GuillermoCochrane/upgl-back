//Middleware de configuración de multer
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    
    destination: function(req, file, cb){
        let {courseID, classID, topicID} = req.params;
        let uploadPath = path.join(__dirname, "../../../public/videos", courseID, classID, topicID);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath)
    },

    filename: function(req,file, cb){
        let {title} = req.body;
        let textArray = title.split(' ');
        if (textArray.length > 1) {
            textArray.shift();
        }
        text = textArray.join('_');
        let newFileName =  `${text}_${Date.now()}${path.extname(file.originalname)}`
        cb(null, newFileName)
    }
})

const upload = multer({storage})

module.exports = upload