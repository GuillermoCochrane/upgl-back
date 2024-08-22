const express = require('express');
const router = express.Router();
const controller = require("../../Controllers/API/courseApiController");

//Middlewares
const classValidations = require("../../middlewares/validations/classesValidationsMDW");
const topicValidations = require("../../middlewares/validations/topicValidationsMDW");
const courseValidations = require("../../middlewares/validations/courseValidationsMDW");

//Routes
router.get("/index", controller.coursesIndex);
router.get("/:courseID", controller.index);
router.get("/:courseID/class", controller.allClassesData);
router.get("/:courseID/class/:classID", controller.classData);
router.get("/:courseID/class/:classID/topic/:topicID", controller.topicData);
router.get("/:courseID/classIndex/:indexID", controller.classIndex);
router.post("/newCourse", courseValidations ,controller.newCourse);
router.post("/:courseID/newClass", classValidations, controller.newClass);
router.post("/:courseID/newTopic/:classID", topicValidations,controller.newTopic);

module.exports = router;