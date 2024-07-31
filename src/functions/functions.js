const fs = require('fs');
const path = require('path');

const pythonFunctions = {

    pathPythonDB: path.join(__dirname, '../data/pythonDB.json'),

    pathIADB: path.join(__dirname, '../data/iaDB.json'),

    dBselector: function(course){
        let database ;
        if (course == "python"){
            database = this.pathPythonDB;
        } else if (course == "ia"){
            database = this.pathIADB;
        };
        return database;
    },

    store: function(data, course){
        let database = this.dBselector(course);
        fs.writeFileSync( database, JSON.stringify(data, null, '  ') );
        return true;
    },

    allEntries: function(course)  {
        let data = [];
        let database = this.dBselector(course);
        let readDB = fs.readFileSync(database, 'utf-8');
        if (readDB != ""){
            data = JSON.parse(readDB);
        };
        return data;
    },

    fullIndex: function(course){
        let data = this.allEntries(course);
        let index = [];
        for (const lesson of data){
            let indexdata = {};
            if(lesson.class != "home"){
                indexdata.summary =  lesson.summary;
                indexdata.classID =  lesson.class;
                indexdata.links = this.classLinks(lesson.classData);
                index.push(indexdata)
            };
        }
        return index;
    },

    classIndex: function(course, classID){
        let fullIndex = this.fullIndex(course);
        let classIndex = fullIndex.filter(index => index.classID == classID);
        return classIndex;
    },

    classLinks: function(topics){
        let links = [];
        for (const topic of topics){
            
            let link = topic.linkData;
            link.topicID = topic.topic;
            links.push(link);
        }
        return links;
    },

    filterData: function(course, classID, topicID){
        let allData = this.allEntries(course);
        topicsData = allData.filter(lesson => lesson.class == classID)[0];
        if (topicsData){
            topicID ? topicsData = this.filterTopic(topicsData.classData, classID, topicID, course) : null;
        } else {
            topicsData = {
                classNotFound: true,
                info: {
                    meta: {
                        status : 404,
                        class: classID,
                        topic: topicID,
                        found: false,
                        url:  `api/${course}/class/:classID/:topicID`
                    },
                    data: {
                        classFound: false
                    }
                }
            };
        }
        return topicsData;
    },

    filterTopic: function(info, classID, topicID, course){
        let topicData = info.filter(topic => topic.topic == topicID)[0];
        if (!topicData){
            topicData = {
                topicNotFound: true,
                info: {
                    meta: {
                        status : 404,
                        class: classID,
                        topic: topicID,
                        found: false,
                        url: `api/${course}/class/:classID/:topicID`
                    },
                    data: {
                        topicFound: false
                    }
                }
            };
        }
        return topicData;
    },

    newClassID : function(course){
        let data = this.allEntries(course);
        let lastClass = data.filter(classes => typeof classes.class == "number").pop();
        let newID = lastClass.class + 1;
        return newID;
    },

    newTopicID : function(course, classID){
        let data = this.allEntries(course);
        let classTopics = data.filter(lesson => lesson.class == classID)[0].classData;
        let lastTopic = classTopics.pop();
        let newTopicID = lastTopic ? lastTopic.topic + 1 :1;
        return newTopicID;
    },

    newClass: function(course, data){
        let classID = this.newClassID(course);
        let fullCourse = this.allEntries(course);
        let newClass = {
            class: classID,
            available: true,
            topics: 0,
            summary: data  ? data.summary : "",
            title: {
                type: "h2",
                info: [
                    {
                        text: data ? data.title : "",
                        content: "plain"
                    }
                ]
            },
            classData: []
        }

        fullCourse.push(newClass);
        this.store(fullCourse, course);
        return newClass;
    },

    newTopic: function(course, classID, data){
        let topicID = this.newTopicID(course, classID);
        let allClasses= this.allEntries(course);
        let allTopics = allClasses.filter(lesson => lesson.class == classID)[0].classData;
        let newTopic = {
            topic: topicID,
            available: true,
            linkData: {
                title: data ? data.title : "",
                link: `/courses/${course}/class/${classID}/${topicID}`
            },
            topicData: []
        };

        allTopics.push(newTopic);
        for (const lesson of allClasses){
            if (lesson.class == classID){
                lesson.classData = allTopics;
                lesson.topics = allTopics.length;
            }
        }
        this.store(allClasses, course);
        return newTopic;
    }
}


module.exports = pythonFunctions