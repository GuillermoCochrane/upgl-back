const fs = require('fs');
const path = require('path');

const pythonFunctions = {

    pathDB: path.join(__dirname, '../data/pythonDB.json'),

    allEntries: function()  {
        let data = [];
        let readDB = fs.readFileSync(this.pathDB, 'utf-8');
        if (readDB != ""){
            data = JSON.parse(readDB);
        };
        return data;
    },

    fullIndex: function(){
        let data = this.allEntries();
        //console.log(data);
        let index = []
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
    }
}

module.exports = pythonFunctions