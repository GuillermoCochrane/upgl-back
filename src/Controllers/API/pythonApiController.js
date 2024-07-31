const functions = require("../../functions/functions");

const pythonApiController = {
    index: function(req,res){
        let data = functions.fullIndex("python");
        let info = {
            meta: {
                status : 200,
                total_index: data.length,
                url: 'api/python',
            },
            data,
        }
        return res.json(info)
    },

    classIndex: function(req,res){
        let data = functions.classIndex("python",req.params.indexID);
        let info = {
            meta: {
                status : 200,
                classIndex: req.params.indexID,
                url: 'api/python/:indexID',
            },
            data,
        }
        return res.json(info)
    },

    allClassesData: function(req,res){
        let data = functions.allEntries("python");
        let info = {
            meta: {
                status : 200,
                clases: data.length,
                url: 'api/python/class',
            },
            data,
        }
        return res.json(info)
    },

    classData: function(req,res){
        let data = functions.filterData("python",req.params.classID);
        if (data.classNotFound){
            return res.json(data.info)
        } else {
        let info = {
            meta: {
                status : 200,
                class: data.classId,
                url: 'api/python/class/:classID',
            },
            data,
        }
        return res.json(info)
        }
    },

    topicData: function(req,res){
        let data = functions.filterData("python",req.params.classID,req.params.topicID);
        if (data.topicNotFound){
            return res.json(data.info)
        } else {
        let info = {
            meta: {
                status : 200,
                class: req.params.classID,
                topic: req.params.topicID,
                url: 'api/python/class/:classID/:topicID',
            },
            data,
        }
        return res.json(info)
        }
    },

    newClass: function(req,res){
        let data = functions.newClass("python",req.body);
        let info = {
            meta: {
                status : 200,
                class: data.classID,
                url: 'api/python/newClass',
            },
            data,
        }
        return res.json(info)
    },
}
module.exports = pythonApiController