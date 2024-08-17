const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    "Summary": {
        type: String,
        required: true
    },

    "Precipitation Type": {
        type: String,
        required: false
    },
    "Temperature": {
        type: Number,
        required: true
    },
    "Humidity": {
        type: Number,
        required: true
    },  
});

module.exports.WeatherSchema = WeatherSchema;