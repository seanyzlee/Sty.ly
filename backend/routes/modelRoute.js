const express = require('express');
const router = express.Router();
const {askOutfitRecommendation} = require("../controllers/modelController");

router.route("/askModelOutfits").get(askOutfitRecommendation);

    
module.exports = router;