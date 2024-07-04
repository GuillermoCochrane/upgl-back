const pythonFunctions = require("../../functions/pythonFunctions")

const pythonApiController = {
    index: function(req,res){
        let data = pythonFunctions.fullIndex();
        let info = {
            meta: {
                status : 200,
                total_index: data.length,
                url: 'api/python'
            },
            data
        }
        return res.json(info)
    },

    allClassesData: function(req,res){
        let data = pythonFunctions.allEntries();
        let info = {
            meta: {
                status : 200,
                clases: data.length,
                url: 'api/python/class'
            },
            data
        }
        return res.json(info)
    },

    classData: function(req,res){
        let data = pythonFunctions.filterData(req.params.classID);
        let info = {
            meta: {
                status : 200,
                class: data.classId,
                topics: data.topics,
                url: 'api/python/class/:claasID'
            },
            data
        }
        return res.json(info)
    },

    topicData: function(req,res){
        let data = pythonFunctions.filterData(req.params.classID,req.params.topicID);
        let info = {
            meta: {
                status : 200,
                topic: data.topic,
                url: 'api/python/class/:claasID/:topicID'
            },
            data
        }
        return res.json(info)
    },
}
module.exports = pythonApiController