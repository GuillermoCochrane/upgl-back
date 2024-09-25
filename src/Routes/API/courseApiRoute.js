const express = require('express');
const router = express.Router();
const controller = require("../../Controllers/API/courseApiController");

//Middlewares

//Validations
const classValidations = require("../../middlewares/validations/classesValidationsMDW");
const topicValidations = require("../../middlewares/validations/topicValidationsMDW");
const courseValidations = require("../../middlewares/validations/courseValidationsMDW");
const h3Validations = require("../../middlewares/validations/h3ValidationsMDW");
const pValidations = require("../../middlewares/validations/pValidationsMDW");
const linkValidations = require("../../middlewares/validations/linkValidationsMDW");
const downloadValidations = require("../../middlewares/validations/downloadValidationsMDW");
const youtubeValidations = require("../../middlewares/validations/youtubeValidationsMDW");
const imageValidations = require("../../middlewares/validations/imageValidationsMDW");
const listValidations = require("../../middlewares/validations/listValidationsMDW");
const liValidations = require("../../middlewares/validations/liValidationsMDW");

//Multer
const imageMulterMDW = require("../../middlewares/multer/imageMulterMDW");

//Routes

// Read
router.get("/index", controller.coursesIndex);
router.get("/check/:course", controller.courseCheck);
router.get("/:courseID", controller.index);
router.get("/:courseID/class", controller.allClassesData);
router.get("/:courseID/class/:classID", controller.classData);
router.get("/:courseID/class/:classID/topic/:topicID", controller.topicData);
router.get("/:courseID/classIndex/:indexID", controller.classIndex);

//Create
router.post("/newCourse", courseValidations ,controller.newCourse);
router.post("/newClass/:courseID", classValidations, controller.newClass);
router.post("/newTopic/:courseID/:classID", topicValidations,controller.newTopic);
router.post("/newH3/:courseID/:classID/:topicID", h3Validations, controller.newH3);
router.post("/newH4/:courseID/:classID/:topicID", h3Validations, controller.newH4);
router.post("/newLink/:courseID/:classID/:topicID", linkValidations, controller.newLink);
router.post("/newDownload/:courseID/:classID/:topicID", downloadValidations, controller.newDownload);
router.post("/newLocalDownload/:courseID/:classID/:topicID", controller.newLocalDownload);
router.post("/newImage/:courseID/:classID/:topicID/", imageMulterMDW.single("image"), imageValidations, controller.newImage);
router.post("/newYoutube/:courseID/:classID/:topicID", youtubeValidations, controller.newYoutube);
router.post("/newAnswer/:courseID/:classID/:topicID/", imageMulterMDW.single("image"), imageValidations, controller.newAnswer);
router.post("/newP/:courseID/:classID/:topicID", pValidations, controller.newP);
router.post("/newList/:courseID/:classID/:topicID", listValidations, controller.newList);
router.post("/newLi/:courseID/:classID/:topicID/:sectionID", liValidations, controller.newLi);
router.post("/newStub/:courseID/:classID/:topicID/:sectionID", liValidations, controller.newStub);

module.exports = router;