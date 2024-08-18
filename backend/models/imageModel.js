const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    "base64Image": {
        type: String,
        required: true
    }
});

module.exports.ImageSchema = ImageSchema;