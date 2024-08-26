const express = require('express');
const router = express.Router();
const controller = require("../../Controllers/API/controlPanelApiController");

//Middlewares

//Routes

router.get("/links", controller.links);
router.get("/sections", controller.sections);
router.get("/up", controller.up);


module.exports = router;