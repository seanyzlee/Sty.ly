require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const {getAndPostWeatherData} = require('./services/weatherServices');

connectDB();

const app = express();
const PORT = process.env.PORT || 5005;

async function runScheduledTask() {
  const weatherData = await getAndPostWeatherData();
}

runScheduledTask();
const TEN_MINUTES = 600000;
setInterval(runScheduledTask, TEN_MINUTES);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require('./routes/weatherRoute'));
app.use("/", require('./routes/modelRoute'));
const server = app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});

