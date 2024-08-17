const express = require('express');
const router = express.Router();
const { getWeather, getLatestWeather, addWeather } = require("../controllers/weatherController");

router.route("/getWeather").get(getWeather);
router.route("/addWeather").post(addWeather);
router.route("/getLatestWeather").get(getLatestWeather);
    
module.exports = router;