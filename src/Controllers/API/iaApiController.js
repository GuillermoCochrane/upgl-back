const iaApiController = {
    index: function(req,res){
        return res.render('index',{title:'IA API'})
    },
}
module.exports = iaApiController