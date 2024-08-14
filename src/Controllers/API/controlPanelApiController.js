const functions = require("../../functions/functions");

const controlPanelApiController = {
    index: function(req,res){
        return res.send("Control Panel API")
    },
}

module.exports = controlPanelApiController