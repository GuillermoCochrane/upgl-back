const express = require('express');
const router = express.Router();
const mainController = require("../../Controllers/API/pythonApiController")

router.get("/", mainController.index)
router.get("/class", mainController.classData)

module.exports = router