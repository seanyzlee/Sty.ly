const mongoose = require("mongoose");  
const {WeatherSchema} = require("../models/weatherModel");
const axios = require("axios");
const {getLatestWeatherData} = require('../services/modelServices');


const WeatherInfo = mongoose.model("WeatherInfo", WeatherSchema);

const askOutfitRecommendation = async (req, res) => {
     response = await getLatestWeatherData()
    .then((response) => {
        res.json(response);
    })
    .catch((error) => {
        res.json(error);
    });
}

module.exports = { askOutfitRecommendation };

