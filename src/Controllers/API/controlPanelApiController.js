const functions = require("../../functions/functions");

const controlPanelApiController = {
    index: function(req,res){
        const data = functions.allEntries("controlPanel");
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
}

module.exports = controlPanelApiController