const {fetchWeatherApi} = require('openmeteo')
const json = require('json')

const getWeatherAPI = async () => {
    try {
        const params = {
            "latitude": 52.52,
            "longitude": 13.41,
            "current": ["temperature_2m", "relative_humidity_2m", "precipitation", "rain", "showers", "snowfall", "weather_code"]
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        
        // Helper function to form time ranges
        const range = (start, stop, step) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        
        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();
        
        const current = response.current();
        
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            Temperature: parseFloat(current.variables(0).value()).toFixed(1),
            Humidity: current.variables(1).value() / 100,
            PrecipitationType: getPrecipitationType(current.variables(6).value()), // Use weatherCode here
            Summary: getWeatherCondition(current.variables(6).value()), // Use weatherCode here
        };

        // Process weather data
        const processedWeatherData = processWeatherData(weatherData);
        return processedWeatherData;

        
    } catch (error) {
        console.log(error);
    }
}

const getWeatherCondition = (weatherCode) => {
    switch (weatherCode) {
        case 0:
            return "Clear"
        case 1:
            return "Clear"
        case 2:
            return "Partly Cloudy"
        case 3:
            return "Overcast"
        case 45:
            return "Fog"
        case 49:
            return "Fog"
        case 51:
            return "Rain"
        case 53:
            return "Rain"
        case 55:
            return "Rain"
        case 56:
            return "Rain"
        case 57:
            return "Rain"
        case 61:
            return "Rain"
        case 63:
            return "Rain"
        case 65:
            return "Rain"
        case 66:
            return "Rain"
        case 67:
            return "Rain"
        case 71:
            return "Snow"
        case 73:
            return "Snow"
        case 75:
            return "Snow"
        case 77:
            return "Snow"
        case 80:
            return "Rain"
        case 81:
            return "Rain"
        case 85:
            return "Snow"
        case 86:
            return "Snow"
        default:
            return null // For codes not related to rain or snow

    }
};

const getPrecipitationType = (weatherCode) => {
    if ([61, 63, 65].includes(weatherCode)) {
        return 'Rain';
    } else if ([71, 73, 75, 77].includes(weatherCode)) {
        return 'Snow';
    } else if ([51, 53, 55].includes(weatherCode)) {
        return 'Rain';
    } else if ([66, 67].includes(weatherCode)) {
        return 'Rain';
    } else if ([80, 81, 82].includes(weatherCode)) {
        return 'Rain';
    } else if ([85, 86].includes(weatherCode)) {
        return 'Snow';
    } else if ([45, 48].includes(weatherCode)) {
        return 'Fog';
    } else {
        return null;
    }
}

const processWeatherData = (data) => {
    const cleanedData = {
        Summary: data.Summary,
        PrecipitationType: data.PrecipitationType,
        Temperature: parseFloat(data.Temperature).toFixed(1), 
        Humidity: parseFloat(data.Humidity) };

    return cleanedData
}




module.exports = { getWeatherAPI };