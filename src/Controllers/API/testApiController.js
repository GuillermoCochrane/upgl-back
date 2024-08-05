const functions = require("../../functions/functions");

const testApiController = {

    index: function(req,res){
        let data = functions.fullIndex("test");
        let info = {
            meta: {
                status : 200,
                total_index: data.length,
                url: 'api/test',
            },
            data
        }
        return res.json(info);
    },

    allClassesData: function(req,res){
        let data = functions.allEntries("test");
        let info = {
            meta: {
                status : 200,
                clases: data.length,
                url: 'api/test/class',
            },
            data,
        }
        return res.json(info)
    },

}
module.exports = testApiController