const express = require('express');
const router = express.Router();
const mainController = require("../../Controllers/API/pythonApiController")

router.get("/", mainController.index)
router.get("/class", mainController.allClassesData)
router.get("/class/:classID", mainController.classData)
router.get("/class/:classID/:topicID", mainController.topicData)

module.exports = router