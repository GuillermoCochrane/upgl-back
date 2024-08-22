const utilities = require("../../utilities/utilities");

const controlPanelApiController = {
    index: function(req,res){
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

    up: function(req,res){
        return res.send("Api UPGL is working")
    }
}

module.exports = controlPanelApiController