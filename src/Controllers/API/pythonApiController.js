const pythonApiController = {
    index: function(req,res){
        return res.render('index',{title:'Python API'})
    },
}
module.exports = pythonApiController