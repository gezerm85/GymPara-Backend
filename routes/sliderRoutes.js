const express = require("express");
const router = express.Router();
const { getSliders } = require("../controllers/sliderController");

router.get("/", getSliders);

module.exports = router;
