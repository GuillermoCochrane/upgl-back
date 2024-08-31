const { info } = require('console');
const fs = require('fs');
const { type } = require('os');
const path = require('path');

const pythonFunctions = {

    dBselector: function(course){
        let database = path.join(__dirname, `../data/${course}DB.json`);
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

    filterCourse: function(data,key){
        let alldata = this.allEntries("courses");
        return alldata.filter(user => user[key].toUpperCase() == data.toUpperCase())
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

    endpointSuccess: function(endpoint, data, courseID, classID, topicID, sectionID){
        let info = {
            meta: {
                status : 201,
                created: true,
                url: endpoint,
                course: courseID ? courseID : null,
            },
            data,
        }
        classID ? info.meta.class = parseInt(classID) : null;
        topicID ? info.meta.topic = parseInt(topicID) : null;
        sectionID ? info.meta.section = parseInt(sectionID) : null;
        return info
    },

    endpointError: function(endpoint, errors, oldData){
        let info = {
            meta: {
                status : 400,
                created: false,
                url: endpoint,
            },
            errors,
            oldData 
        }
        return info;
    },

    newClassID : function(course){
        let data = this.allEntries(course);
        let lastClass = data.filter(classes => typeof classes.class == "number").pop();
        let newID = lastClass ? lastClass.class + 1 : 1;
        return newID;
    },

    newTopicID : function(course, classID){
        let data = this.allEntries(course);
        let classTopics = data.filter(lesson => lesson.class == classID)[0].classData;
        let lastTopic = classTopics.pop();
        let newTopicID = lastTopic ? lastTopic.topic + 1 :1;
        return newTopicID;
    },

    newSectionID : function(course, classID, topicID){
        let data = this.allEntries(course);
        let classTopics = data.filter(lesson => lesson.class == classID)[0].classData;
        let topicSections = classTopics.filter(topic => topic.topic == topicID)[0].topicData;
        let lastSection = topicSections.pop();
        let newSectionID = lastSection ? lastSection.id + 1 : 1;
        return newSectionID;
    },

    newCourse: function(data){
        let allCourses = this.allEntries("courses");
        let id = data.name.split(" ").join("").toLowerCase();
        let info = {
            id: id,
            name: data.name,
            link: `/courses/${id}`,
            title: `Curso de ${data.name}`,
            intro: data.intro,
            paragraph: data.paragraph
        }
        allCourses.push(info);
        this.store(allCourses, "courses");
        this.store([], id);
        return info;
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
            sections: 0,
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
    },

    newSection: function(course, classID, topicID, data){
        let allClasses = this.allEntries(course);
        let classTopics = allClasses.filter(lesson => lesson.class == classID)[0].classData;
        let topicSections = classTopics.filter(topic => topic.topic == topicID)[0].topicData;
        let sectionID = this.newSectionID(course, classID, topicID);

        let newSection = {
            type: data ? data.type : "",
            id: sectionID,
            order: sectionID,
            available: true,
            stubs: data ? data.info.length  : 0,
            info:  data ? data.info : [],
        };

        topicSections.push(newSection);

        for (const topic of classTopics){       
            if (topic.topic == topicID){    
                topic.topicData = topicSections;
                topic.sections = topicSections.length; 
            }     
        }

        for (const lesson of allClasses){
            if (lesson.class == classID){
                lesson.classData = classTopics;
                lesson.topics = classTopics.length;
            }
        }

        this.store(allClasses, course);
        return newSection;
    },

    newTitle : function(data){
        let info = {};
        info.type = data && data.type ? data.type : " ";
        info.info = [
            {
                text: data && data.text ? data.text : "",
                content: data && data.content ? data.content : "plain"
            }
        ];
        return info;
    },

    newLink: function(data){
        let info = {};
        info.type = data && data.type ? data.type : "";
        info.info = [
            {
                text: data && data.text ? data.text : "",
                link: data && data.link ? data.link : "",
                content: data && data.content ? data.content : "plain"
            }
        ];
        return info;
    }

}


module.exports = pythonFunctions