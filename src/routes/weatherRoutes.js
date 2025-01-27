const express = require("express");

const router = express.Router();

// Route to get current weather by city
router.get("/current/:city", () => {
  console.log("Current Weather");
});

// Route to get 5-day forecast by city
router.get("/forecast/:city", () => {
  console.log("forecast Weather");
});

module.exports = router;
