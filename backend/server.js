require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const {getWeatherAPI} = require('./services/weatherServices');

connectDB();

const app = express();
const PORT = process.env.PORT || 5005;
getWeatherAPI();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require('./routes/weatherRoute'));

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

