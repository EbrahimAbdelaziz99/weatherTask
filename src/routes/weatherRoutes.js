const express = require("express");
const {
  getCurrentWeather,
  get5DayForecast,
} = require("../controllers/weatherController");
const checkCache = require("../middlewares/checkCache.js");

const router = express.Router();

// Route to get current weather by city
router.get("/current/:city", checkCache, getCurrentWeather);

// Route to get 5-day forecast by city
router.get("/forecast/:city", checkCache, get5DayForecast);

module.exports = router;
