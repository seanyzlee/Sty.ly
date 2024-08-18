const mongoose = require("mongoose");  
const {ImageSchema} = require("../models/imageModel");
const axios = require("axios");
const {getLatestWeatherData} = require('../services/modelServices');
const {getOutfitImage} = require('../services/modelServices');


const ImageInfo = mongoose.model("ImageInfo", ImageSchema);

const askOutfitRecommendation = async (req, res) => {
     response = await getLatestWeatherData()
    .then((response) => {
        res.json(response);
    })
    .catch((error) => {
        res.json(error);
    });
}

const saveOutfitBase64Image = async (req,res) => {
    try{
    response = await getOutfitImage();

    const newImageInfo = new ImageInfo({
        base64Image: response
    });
    await newImageInfo.save()
    res.json({message: "Image saved successfully"});
} catch (error) {
    res.json({message: "HELLO WORLD"});
}

}

// DOESNT MATTER
const getLatestBased64Image = async (req, res) => {
    try {
        const image = await ImageInfo.find().sort({createdAt: -1}).limit(1);
        res.json(image);
    } catch (error) {
        res.json({message: error});
    }




}
module.exports = { askOutfitRecommendation, saveOutfitBase64Image, getLatestBased64Image };