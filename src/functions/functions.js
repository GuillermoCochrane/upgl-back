const fs = require('fs');
const path = require('path');

const pythonFunctions = {

    pathPythonDB: path.join(__dirname, '../data/pythonDB.json'),

    pathIADB: path.join(__dirname, '../data/iaDB.json'),

    allEntries: function(course)  {
        let data = [];
        let database = "";

        if (course == "python"){
            database = this.pathPythonDB;
        } else if (course == "ia"){
            database = this.pathIADB;
        };

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
            indexdata.summary =  lesson.summary;
            indexdata.classId =  lesson.class;
            indexdata.links = this.classLinks(lesson.classData);
            index.push(indexdata)
        }
        return index;
    },

    classLinks: function(topics){
        let links = [];
        for (const topic of topics){
            let link = topic.linkData;
            links.push(link);
        }
        return links;
    },

    filterData: function(course,classID, topicID){
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

    filterTopic: function(info,classID, topicID, course){
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
}

module.exports = pythonFunctions