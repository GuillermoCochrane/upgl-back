const express = require('express');
const router = express.Router();
const controller = require("../../Controllers/API/courseApiController");

//Middlewares
const classValidations = require("../../middlewares/validations/classesValidationsMDW");

//Routes
router.get("/index", controller.coursesIndex);
router.get("/:courseID", controller.index);
router.get("/:courseID/class", controller.allClassesData);
router.get("/:courseID/class/:classID", controller.classData);
router.get("/:courseID/class/:classID/topic/:topicID", controller.topicData);
router.get("/:courseID/classIndex/:indexID", controller.classIndex);
router.post("/:courseID/newClass", classValidations, controller.newClass);
router.post("/:courseID/newTopic/:classID", controller.newTopic);

module.exports = router;