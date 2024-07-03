const indexController = {
    index: function(req,res){
        return res.render('index',{title:'Bienvenido a la API de UPGL'})
    },
}
module.exports = indexController