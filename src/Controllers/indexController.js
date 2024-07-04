path = require('path');
const indexController = {
    index: function(req,res){
        let index =  path.resolve(__dirname,'../Views/index.html');
        return res.sendFile(index)
        //return res.send('Bienvenido a la API de UPGL')
    },
}
module.exports = indexController
