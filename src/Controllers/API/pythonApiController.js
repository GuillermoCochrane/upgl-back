const pythonFunctions = require("../../functions/pythonFunctions")

const pythonApiController = {
    index: function(req,res){
        let data = pythonFunctions.fullIndex();
        let info = {
            meta: {
                status : 200,
                total: data.length,
                url: 'api/python'
            },
            data
        }
        return res.json(info)
    },

    classData: function(req,res){
        let data = pythonFunctions.allEntries();
        let info = {
            meta: {
                status : 200,
                total: data.length,
                url: 'api/python/class'
            },
            data
        }
        return res.json(info)
    },
}
module.exports = pythonApiController