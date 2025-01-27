const axios = require("axios");

const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Get current weather by city
const getCurrentWeather = async (req, res) => {
  const { city } = req.params;
  console.log("city name :", city);

  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    const { name, main, weather, wind } = response.data;
    res.json({
      city: name,
      temperature: main.temp,
      description: weather[0].description,
      humidity: main.humidity,
      windSpeed: wind.speed,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch current weather" });
  }
};

// Get 5-day weather forecast by city
const get5DayForecast = async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    const forecastData = response.data.list.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = { temps: [], descriptions: [] };
      }
      acc[date].temps.push(item.main.temp);
      acc[date].descriptions.push(item.weather[0].description);
      return acc;
    }, {});

    const formattedForecast = Object.entries(forecastData).map(
      ([date, { temps, descriptions }]) => ({
        date,
        avgTemp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(2),
        description: descriptions[0], // Simplified for brevity
      })
    );

    res.json(formattedForecast);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch 5-day forecast" });
  }
};

module.exports = { getCurrentWeather, get5DayForecast };
