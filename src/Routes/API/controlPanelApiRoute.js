const express = require('express');
const router = express.Router();
const controller = require("../../Controllers/API/controlPanelApiController");

//Middlewares

//Routes

router.get("/links", controller.index);
router.get("/up", controller.up);


module.exports = router;