const axios = require("axios");
require("dotenv").config(); // Load environment variables

// Increase timeout for real API requests
jest.setTimeout(10000);

describe("Weather Controller (Real API Calls)", () => {
  describe("GET http://localhost:3000/weather/current/:city", () => {
    it("should return current weather for a valid city", async () => {
      // const response = await request(app).get("/weather/current/London");
      const response = await axios.get(
        "http://localhost:3000/weather/current/London"
      );
      console.log("1", response.data);
      console.log("1", response.status);

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("city", "London");
      expect(response.data).toHaveProperty("temperature");
      expect(response.data).toHaveProperty("description");
      expect(response.data).toHaveProperty("humidity");
      expect(response.data).toHaveProperty("windSpeed");
    });

    it("should return an error for an invalid city", async () => {
      const response = await axios.get(
        "http://localhost:3000/weather/current/nflajbnvkhdv"
      );
      console.log("2", response.data);
      console.log("2", response.status);

      expect(response.status).toBe(404); // OpenWeather returns 404 for invalid cities
      // expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET http://localhost:3000/weather/forecast/:city", () => {
    it("should return a 5-day weather forecast for a valid city", async () => {
      const response = await axios.get(
        "http://localhost:3000/weather/forecast/paris"
      );

      console.log("3", response.data);
      console.log("3", response.status);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);

      response.data.forEach((day) => {
        expect(day).toHaveProperty("date");
        expect(day).toHaveProperty("avgTemp");
        expect(day).toHaveProperty("description");
      });
    });

    it("should return an error for an invalid city", async () => {
      const response = await axios.get(
        "http://localhost:3000/weather/forecast/nflajbnvkhdv"
      );

      console.log("4", response.data);
      console.log("4", response.status);

      expect(response.status).toBe(404); // OpenWeather returns 404 for invalid cities
      // expect(response.body).toHaveProperty("error");
    });
  });
});
