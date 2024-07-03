const express = require('express');
const router = express.Router();
const mainController = require("../Controllers/indexController")

router.get("/", mainController.index)

module.exports = router