const express = require('express');
const router = express.Router();
const mainController = require("../../Controllers/API/iaApiController")

router.get("/", mainController.index)

module.exports = router