const express = require("express");
const {
  getCurrentWeather,
  get5DayForecast,
} = require("../controllers/weatherController");

const router = express.Router();

// Route to get current weather by city
router.get("/current/:city", getCurrentWeather);

// Route to get 5-day forecast by city
router.get("/forecast/:city", get5DayForecast);

module.exports = router;
