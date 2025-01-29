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

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("city", "London");
      expect(response.data).toHaveProperty("temperature");
      expect(response.data).toHaveProperty("description");
      expect(response.data).toHaveProperty("humidity");
      expect(response.data).toHaveProperty("windSpeed");
    });

    it("should return an error for an invalid city", async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/weather/current/nflajbnvkhdv"
        );
      } catch (error) {
        console.log("2", error.response.data);
        console.log("2", error.status);
        expect(error.status).toBe(404);
        expect(error.response.data).toHaveProperty("error");
      }
    });
  });

  describe("GET http://localhost:3000/weather/forecast/:city", () => {
    it("should return a 5-day weather forecast for a valid city", async () => {
      const response = await axios.get(
        "http://localhost:3000/weather/forecast/paris"
      );

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
      try {
        const response = await axios.get(
          "http://localhost:3000/weather/forecast/nflajbnvkhdv"
        );
      } catch (error) {
        console.log("4", error.response.data);
        console.log("4", error.status);
        expect(error.status).toBe(404);
        expect(error.response.data).toHaveProperty("error");
      }
    });
  });
});
