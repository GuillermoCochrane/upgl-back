const utilities = require("../../utilities/utilities");
const { validationResult } = require('express-validator');

const courseApiController = {

    courseCheck: function(req,res){
        let request = req.params.course.split(" ").join("").toLowerCase();
        let data = utilities.filterCourse(request, "id")[0];
        let response = true;
        data ? response = true : response = false;
        let info = {
            meta: {
                status : 200,
                url: 'api/courses/check',
            },
            inUse: response,
        }
        return res.json(info)
    },

    index: function(req,res){
        let { courseID } = req.params;
        let data = utilities.fullIndex(courseID);
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
        let data = utilities.allEntries("courses");
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

    classIndex: function(req,res){
        let { courseID, indexID } = req.params;
        let data = utilities.classIndex(courseID,indexID);
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

    allClassesData: function(req,res){
        let { courseID } = req.params;
        let data = utilities.allEntries(courseID);
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
        let data = utilities.filterData(courseID,classID);
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
        let data = utilities.filterData(courseID,classID,topicID);
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

    newCourse : function(req,res){
        let errors = validationResult(req);
        let endpoint =  `api/newCourse`;
        if (errors.isEmpty()){
            let data = utilities.newCourse(req.body);
            let info = utilities.endpointSuccess(endpoint, data, data.id);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newClass: function(req,res){
        let errors = validationResult(req);
        let { courseID } = req.params;
        let endpoint =  `api/newClass/:courseID`;
        if (errors.isEmpty()){
            let data = utilities.newClass(courseID,req.body);
            let info = utilities.endpointSuccess(endpoint, data, courseID, data.class);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newTopic: function(req,res){
        let errors = validationResult(req);
        let { courseID, classID } = req.params;
        let endpoint =  `api/newTopic/:courseID/:classID`;
        if (errors.isEmpty()){
            let data = utilities.newTopic(courseID,classID,req.body);
            let info = utilities.endpointSuccess(endpoint, data, courseID, classID, data.topic);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newH3: function(req,res){
        let errors = validationResult(req);
        let { courseID, classID, topicID } = req.params;
        let endpoint =  `api/newH3/:courseID/:classID/:topicID`;
        if (errors.isEmpty()){
            let titleData = utilities.newTitle(req.body);
            let data = utilities.newSection(courseID,classID,topicID,titleData);
            let info = utilities.endpointSuccess(endpoint, data, courseID, classID, topicID, data.id);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newH4: function(req,res){
        let errors = validationResult(req);
        let { courseID, classID, topicID } = req.params;
        let endpoint =  `api/newH4/:courseID/:classID/:topicID`;
        if (errors.isEmpty()){
            let titleData = utilities.newTitle(req.body);
            let data = utilities.newSection(courseID,classID,topicID,titleData);
            let info = utilities.endpointSuccess(endpoint, data, courseID, classID, topicID, data.id);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newP: function(req, res){
        let errors = validationResult(req);
        let { courseID, classID, topicID } = req.params;
        let endpoint =  `api/newP/:courseID/:classID/:topicID`;
        if (errors.isEmpty()){
            let pData = utilities.newTitle(req.body);
            let data = utilities.newSection(courseID,classID,topicID,pData);
            let info = utilities.endpointSuccess(endpoint, data, courseID, classID, topicID, data.id);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newLink: function(req, res){
        let errors = validationResult(req);
        let { courseID, classID, topicID } = req.params;
        let endpoint =  `api/newLink/:courseID/:classID/:topicID`;
        if (errors.isEmpty()){
            let linkData = utilities.newLink(req.body);
            let data = utilities.newSection(courseID,classID,topicID,linkData);
            let info = utilities.endpointSuccess(endpoint, data, courseID, classID, topicID, data.id);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newDownload: function(req, res){
        errors = validationResult(req);
        let { courseID, classID, topicID } = req.params;
        let endpoint =  `api/newDownload/:courseID/:classID/:topicID`;
        if (errors.isEmpty()){
            let linkData = utilities.newLink(req.body);
            let data = utilities.newSection(courseID,classID,topicID,linkData);
            let info = utilities.endpointSuccess(endpoint, data, courseID, classID, topicID, data.id);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newYoutube: function(req, res){
        errors = validationResult(req);
        let { courseID, classID, topicID } = req.params;
        let endpoint =  `api/newYoutube/:courseID/:classID/:topicID`;
        if (errors.isEmpty()){
            let linkData = utilities.newYoutube(req.body);
            let data = utilities.newSection(courseID,classID,topicID,linkData);
            let info = utilities.endpointSuccess(endpoint, data, courseID, classID, topicID, data.id);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },

    newImage:  function(req, res){
        let errors = validationResult(req);
        let { courseID, classID, topicID } = req.params;
        let endpoint =  `api/newImage/:courseID/:classID/:topicID`;
        if (errors.isEmpty()){
            let linkData = utilities.newImage(req.body, req.file, req.params);
            let data = utilities.newSection(courseID,classID,topicID,linkData);
            let info = utilities.endpointSuccess(endpoint, data, courseID, classID, topicID, data.id);
            return res.json(info)
        } else {
            let info = utilities.endpointError(endpoint, errors.mapped(), req.body);
            return res.json(info)
        }
    },
}

module.exports = courseApiController