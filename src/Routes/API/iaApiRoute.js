const express = require('express');
const router = express.Router();
const mainController = require("../../Controllers/API/iaApiController");

router.get("/", mainController.index);
router.get("/class", mainController.allClassesData);
router.get("/class/:classID", mainController.classData);
router.get("/class/:classID/:topicID", mainController.topicData);
router.get("/:indexID", mainController.classIndex);
router.post("/newClass", mainController.newClass)

module.exports = router;
/* 

router.post("/newTopic/:classID", mainController.newTopic)
 */