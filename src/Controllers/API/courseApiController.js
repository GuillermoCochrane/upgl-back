const functions = require("../../functions/functions");
const { validationResult } = require('express-validator');

const courseApiController = {

    index: function(req,res){
        let { courseID } = req.params;
        let data = functions.fullIndex(courseID);
        let endpoint =  `api/course/${courseID}`;
        let info = {
            meta: {
                status : 200,
                course: courseID,
                total_index: data.length,
                url: endpoint,
            },
            data
        }
        return res.json(info);
    },

    coursesIndex: function(req,res){
        let data = functions.allEntries("courses");
        let endpoint =  `api/courses/index`;
        let info = {
            meta: {
                status : 200,
                courses: data.length,
                url: endpoint,
            },
            data
        }
        return res.json(info);
    },

    allClassesData: function(req,res){
        let { courseID } = req.params;
        let data = functions.allEntries(courseID);
        let endpoint =  `api/course/${courseID}/class`;
        let info = {
            meta: {
                status : 200,
                course: courseID,
                clases: data.length,
                url: endpoint,
            },
            data,
        }
        return res.json(info)
    },

    classData: function(req,res){
        let { courseID, classID } = req.params;
        let data = functions.filterData(courseID,classID);
        let endpoint =  `api/course/${courseID}/class/${classID}`;
        if (data.classNotFound){
            return res.json(data.info)
        } else {
        let info = {
            meta: {
                status : 200,
                course: courseID,
                class: classID,
                url: endpoint,
            },
            data,
        }
        return res.json(info)
        }
    },

    topicData: function(req,res){
        let {courseID,classID,topicID} = req.params;
        let data = functions.filterData(courseID,classID,topicID);
        endpoint =  `api/course/${courseID}/class/${classID}/topic/${topicID}`;
        if (data.topicNotFound){
            return res.json(data.info)
        } else {
        let info = {
            meta: {
                status : 200,
                course: courseID,
                class: classID,
                topic: topicID,
                url: endpoint,
            },
            data,
        }
        return res.json(info)
        }
    },

    classIndex: function(req,res){
        let { courseID, indexID } = req.params;
        let data = functions.classIndex(courseID,indexID);
        let endpoint =  `api/course/${courseID}/classIndex/${indexID}`;
        let info = {
            meta: {
                status : 200,
                classIndex: indexID,
                url: endpoint,
            },
            data,
        }
        return res.json(info)
    },

    newClass: function(req,res){
        let errors = validationResult(req);
        let { courseID } = req.params;
        let endpoint =  `api/${courseID}/newClass`;
        if (errors.isEmpty()){
            let data = functions.newClass(courseID,req.body);

            let info = {
                meta: {
                    status : 201,
                    created: true,
                    class: data.classID,
                    url: endpoint,
                },
                data,
            }
            return res.json(info)
        } else {
            let info = {
                meta: {
                    status : 400,
                    created: false,
                    url: endpoint,
                },
                errors: errors.mapped(),
                oldData: req.body,
            }
            return res.json(info)
        }
    },

    newTopic: function(req,res){
        let { courseID, classID } = req.params;
        let data = functions.newTopic(courseID,classID,req.body);
        let endpoint =  `api/${courseID}/newTopic/${classID}`;
        let info = {
            meta: {
                status : 201,
                class: parseInt(req.params.classID),
                topic: data.topic,
                url: endpoint,
            },
            data,
        }
        return res.json(info)
    },
}
module.exports = courseApiController