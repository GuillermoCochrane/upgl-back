const utilities = require("../../utilities/utilities");

const controlPanelApiController = {
    links: function(req,res){
        const data = utilities.allEntries("controlPanel");
        const endpoint =  `api/controlPanel/links`;
        let info = {
            meta: {
                status : 200,
                totals_links: data.links.length,
                url: endpoint,
            },
            data: data.links
        }
        res.json(info)
    },

    sections: function(req,res){
        const data = utilities.allEntries("controlPanel");
        const endpoint =  `api/controlPanel/sections`;
        let info = {
            meta: {
                status : 200,
                totals_sections: data.sections.length,
                url: endpoint,
            },
            data: data.sections
        }
        res.json(info)
    },

    styles: function(req,res){
        const data = utilities.allEntries("controlPanel");
        const endpoint =  `api/controlPanel/styles`;
        let info = {
            meta: {
                status : 200,
                totals_styles: data.styles.length,
                url: endpoint,
            },
            data: data.styles
        }
        res.json(info)
    },

    up: function(req,res){
        return res.send("Api UPGL is working")
    }
}

module.exports = controlPanelApiController