const request = require("supertest");
const nock = require("nock");
const express = require("express");
const weatherRoutes = require("../src/routes/weatherRoutes");

// Create an Express app for testing
const app = express();
app.use("/weather", weatherRoutes);

// Mock API responses
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

describe("Weather Controller", () => {
  afterEach(() => {
    nock.cleanAll(); // Clean up all mocks after each test
  });

  describe("GET /weather/current/:city", () => {
    it("should return current weather for a valid city", async () => {
      // Mock the OpenWeatherMap API response
      nock(API_BASE_URL)
        .get("/weather")
        .query({ q: "London", appid: "test_key", units: "metric" })
        .reply(200, {
          name: "London",
          main: { temp: 15, humidity: 70 },
          weather: [{ description: "clear sky" }],
          wind: { speed: 5 },
        });

      // Test the endpoint
      const response = await request(app).get("/weather/current/London");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        city: "London",
        temperature: 15,
        description: "clear sky",
        humidity: 70,
        windSpeed: 5,
      });
    });

    it("should return an error for an invalid city", async () => {
      nock(API_BASE_URL)
        .get("/weather")
        .query({ q: "InvalidCity", appid: "test_key", units: "metric" })
        .reply(404, {
          message: "City not found, Please provide a valid city name .",
        });

      const response = await request(app).get("/weather/current/InvalidCity");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to fetch current weather",
      });
    });
  });

  describe("GET /weather/forecast/:city", () => {
    it("should return a 5-day weather forecast for a valid city", async () => {
      nock(API_BASE_URL)
        .get("/forecast")
        .query({ q: "Paris", appid: "test_key", units: "metric" })
        .reply(200, {
          list: [
            {
              dt_txt: "2023-01-01 12:00:00",
              main: { temp: 10 },
              weather: [{ description: "cloudy" }],
            },
            {
              dt_txt: "2023-01-01 15:00:00",
              main: { temp: 12 },
              weather: [{ description: "cloudy" }],
            },
            {
              dt_txt: "2023-01-02 12:00:00",
              main: { temp: 8 },
              weather: [{ description: "sunny" }],
            },
            {
              dt_txt: "2023-01-02 15:00:00",
              main: { temp: 9 },
              weather: [{ description: "sunny" }],
            },
          ],
        });

      const response = await request(app).get("/weather/forecast/Paris");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { date: "2023-01-01", avgTemp: "11.00", description: "cloudy" },
        { date: "2023-01-02", avgTemp: "8.50", description: "sunny" },
      ]);
    });

    it("should return an error for an invalid city", async () => {
      nock(API_BASE_URL)
        .get("/forecast")
        .query({ q: "InvalidCity", appid: "test_key", units: "metric" })
        .reply(404, {
          message: "City not found, Please provide a valid city name .",
        });

      const response = await request(app).get("/weather/forecast/InvalidCity");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to fetch 5-day forecast",
      });
    });
  });
});
