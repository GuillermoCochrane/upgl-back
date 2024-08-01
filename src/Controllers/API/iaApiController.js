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

    classIndex: function(req,res){
        let data = functions.classIndex("ia",req.params.indexID);
        let info = {
            meta: {
                status : 200,
                classIndex: req.params.indexID,
                url: 'api/ia/:indexID',
            },
            data,
        }
        return res.json(info)
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

    classData: function(req,res){
        let data = functions.filterData("ia",req.params.classID);
        if (data.classNotFound){
            return res.json(data.info)
        } else {
        let info = {
            meta: {
                status : 200,
                class: data.classId,
                url: 'api/ia/class/:classID',
            },
            data,
        }
        return res.json(info)
        }
    },

    topicData: function(req,res){
        let data = functions.filterData("ia",req.params.classID,req.params.topicID);
        if (data.topicNotFound){
            return res.json(data.info)
        } else {
        let info = {
            meta: {
                status : 200,
                class: req.params.classID,
                topic: req.params.topicID,
                url: 'api/ia/class/:classID/:topicID',
            },
            data,
        }
        return res.json(info)
        }
    },

    newClass: function(req,res){
        let data = functions.newClass("ia",req.body);
        let info = {
            meta: {
                status : 200,
                class: data.classID,
                url: 'api/ia/newClass',
            },
            data,
        }
        return res.json(info)
    },

    newTopic: function(req,res){
        let data = functions.newTopic("ia",req.params.classID,req.body);
        let info = {
            meta: {
                status : 200,
                class: parseInt(req.params.classID),
                topic: data.topic,
                url: 'api/ia/newTopic/:classID',
            },
            data,
        }
        return res.json(info)
    },
}
module.exports = iaApiController