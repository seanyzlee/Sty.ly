const { faGraduationCap } = require("@fortawesome/free-solid-svg-icons");
const axios = require("axios");

const getSpotifyToken = async (req,res) => {
    const {clientId, clientSecret} = req.body;
    try {
        const response = await axios("https://accounts.spotify.com/api/token", null, {
            params: {
                grant_type: "client_credentials",
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            },

        }) 
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }

}

module.exports = { getSpotifyToken };