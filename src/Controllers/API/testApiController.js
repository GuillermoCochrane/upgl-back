const functions = require("../../functions/functions");
const { validationResult } = require('express-validator');

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

    classData: function(req,res){
        let data = functions.filterData("test",req.params.classID);
        if (data.classNotFound){
            return res.json(data.info)
        } else {
        let info = {
            meta: {
                status : 200,
                class: data.classId,
                url: 'api/test/class/:classID',
            },
            data,
        }
        return res.json(info)
        }
    },

    topicData: function(req,res){
        let data = functions.filterData("test",req.params.classID,req.params.topicID);
        if (data.topicNotFound){
            return res.json(data.info)
        } else {
        let info = {
            meta: {
                status : 200,
                class: req.params.classID,
                topic: req.params.topicID,
                url: 'api/test/class/:classID/:topicID',
            },
            data,
        }
        return res.json(info)
        }
    },

    classIndex: function(req,res){
        let data = functions.classIndex("test",req.params.indexID);
        let info = {
            meta: {
                status : 200,
                classIndex: req.params.indexID,
                url: 'api/test/:indexID',
            },
            data,
        }
        return res.json(info)
    },

    newClass: function(req,res){
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let data = functions.newClass("test",req.body);
            console.log(data);
            let info = {
                meta: {
                    status : 201,
                    created: true,
                    class: data.classID,
                    url: 'api/test/newClass',
                },
                data,
            }
            return res.json(info)
        } else {
            let info = {
                meta: {
                    status : 400,
                    created: false,
                    url: 'api/test/newClass',
                },
                errors: errors.mapped(),
                oldData: req.body,
            }
            return res.json(info)
        }
    },

    newTopic: function(req,res){
        let data = functions.newTopic("test",req.params.classID,req.body);
        let info = {
            meta: {
                status : 201,
                class: parseInt(req.params.classID),
                topic: data.topic,
                url: 'api/test/newTopic/:classID',
            },
            data,
        }
        return res.json(info)
    },
}
module.exports = testApiController