const express = require("express");
const router = express.Router();
const { getSpotify } = require("../controllers/spotifyController");

router.post('/getSpotify', getSpotify);

module.exports = router;