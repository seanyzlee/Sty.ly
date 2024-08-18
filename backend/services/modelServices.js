const axios = require("axios");

const getLatestWeatherData = async () => {
    const response = await axios.get("http://localhost:5050/getLatestWeather")
    const data = response.data;
    var outfit_reco = await askOutfitPrediction(data);

    console.log(outfit_reco)

    while (!outfit_reco.hasOwnProperty("output") || outfit_reco.output === "") {
        outfit_reco = await askOutfitPrediction(data);
    }

    return outfit_reco
}

const askOutfitPrediction = async (data) => {
    const response = await axios.post("http://localhost:5025/api/data", {
        Summary: data[0].Temperature,
        Temperature: data[0].Temperature,
        PrecipitationType: data[0].PrecipitationType,
        Humidity: data[0].Humidity,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.data;
}

const getOutfitImage = async () => {
    const response = await axios.get("http://localhost:5025/api/generateImage")
    return response.data;
}

module.exports = {getLatestWeatherData, getOutfitImage}
