const express = require('express');
const router = express.Router();
const mainController = require("../../Controllers/API/testApiController");

router.get("/", mainController.index);
router.get("/class", mainController.allClassesData);

module.exports = router;