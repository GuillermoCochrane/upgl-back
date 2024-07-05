const functions = require("../../functions/functions");

const iaApiController = {
    index: function(req,res){
        let data = functions.fullIndex("ia");
        let info = {
            meta: {
                status : 200,
                total_index: data.length,
                url: 'api/ia',
            },
            data
        }
        return res.json(info);
    },

    allClassesData: function(req,res){
        let data = functions.allEntries("ia");
        let info = {
            meta: {
                status : 200,
                clases: data.length,
                url: 'api/ia/class',
            },
            data,
        }
        return res.json(info)
    },
}
module.exports = iaApiController