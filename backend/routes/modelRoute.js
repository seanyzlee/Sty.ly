const express = require('express');
const router = express.Router();
const {askOutfitRecommendation} = require("../controllers/modelController");
const {saveOutfitBase64Image} = require("../controllers/modelController");
const {getLatestBased64Image} = require("../controllers/modelController");
const {saveBackgroundRemovedImage} = require("../controllers/modelController");
const {getLatestBackgroundRemovedBased64Image} = require("../controllers/modelController");


router.route("/askModelOutfits").get(askOutfitRecommendation);
router.route("/generateModelOutfits").get(saveOutfitBase64Image);
router.route("/getLatestBased64Image").get(getLatestBased64Image);


    
module.exports = router;