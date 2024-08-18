const express = require('express');
const router = express.Router();
const {askOutfitRecommendation} = require("../controllers/modelController");
const {saveOutfitBase64Image} = require("../controllers/modelController");


router.route("/askModelOutfits").get(askOutfitRecommendation);
router.route("/generateModelOutfits").get(saveOutfitBase64Image);
    
module.exports = router;