const mongoose = require("mongoose");  
const {WeatherSchema} = require("../models/weatherModel");
const WeatherInfo = mongoose.model("WeatherInfo", WeatherSchema);

const getWeather = async (req, res) => {
    try {
        const weather = await WeatherInfo.find();
        res.json(weather);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

const getLatestWeather = async (req, res) => {
    try {
        const weather = await WeatherInfo.find().sort({$natural:-1}).limit(1);
        res.json(weather);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

const addWeather = async (req, res) => {
    const { Summary, PrecipitationType, Temperature, Humidity } = req.body;
    try {
        const newWeather = new WeatherInfo({
            Summary,
            PrecipitationType,
            Temperature,
            Humidity
        });
        await newWeather.save();
        res.json(newWeather);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

module.exports = { getWeather, getLatestWeather, addWeather };

