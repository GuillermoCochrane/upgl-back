const functions = require("../../functions/functions");

const iaApiController = {
    index: function(req,res){
        let data = functions.fullIndex("ia");
        let info = {
            meta: {
                status : 200,
                total_index: data.length,
                url: 'api/python',
            },
            data
        }
        return res.json(info);
    },
}
module.exports = iaApiController