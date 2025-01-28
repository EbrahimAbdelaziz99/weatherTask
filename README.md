# Weather Dashboard API Integration

A backend service built with Node.js and Express.js that integrates with the OpenWeatherMap API to provide weather information. The service exposes two endpoints: one for retrieving the current weather and another for fetching a 5-day weather forecast.

---

## Features

- Retrieve current weather by city:
  - **City name**
  - **Temperature**
  - **Weather description**
  - **Humidity**
  - **Wind speed**
- Fetch a 5-day weather forecast:
  - **Date**
  - **Average temperature**
  - **Weather description**

---

## Requirements

- Node.js (v14+ recommended)
- npm (Node Package Manager)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EbrahimAbdelaziz99/weatherTask.git
   cd weatherTask
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the project root.
   - Add the following line to configure your OpenWeatherMap API key:
     ```env
     OPENWEATHER_API_KEY=your_openweather_api_key
     ```

4. Start the application:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

---

## Endpoints

### 1. **Get Current Weather**

- **Endpoint**: `/weather/current/:city`
- **Method**: `GET`
- **Description**: Retrieves the current weather information for the specified city.
- **Request Parameter**:
  - `city` (path parameter): Name of the city.
- **Response Example**:
  ```json
  {
    "city": "London",
    "temperature": 15,
    "description": "clear sky",
    "humidity": 70,
    "windSpeed": 5
  }
  ```

### 2. **Get 5-Day Weather Forecast**

- **Endpoint**: `/weather/forecast/:city`
- **Method**: `GET`
- **Description**: Retrieves the 5-day weather forecast for the specified city.
- **Request Parameter**:
  - `city` (path parameter): Name of the city.
- **Response Example**:
  ```json
  [
    {
      "date": "2023-01-01",
      "avgTemp": "11.00",
      "description": "cloudy"
    },
    {
      "date": "2023-01-02",
      "avgTemp": "8.50",
      "description": "sunny"
    }
  ]
  ```

---

## Caching with Redis

This application uses Redis for caching API responses to improve performance and reduce unnecessary API calls to the OpenWeatherMap service.

### How It Works

- Cached data is stored with a unique key for each route and city (e.g., `weather:current:London`).
- When a request is made, the application first checks Redis for cached data.
- If cached data exists, it is returned immediately.
- If not, the API is called, and the response is stored in Redis for future requests.

### Clearing the Cache

You can clear the Redis cache manually or programmatically:

- **Manual Clearing**:
  ```bash
  redis-cli FLUSHALL
  ```
- **Programmatic Clearing**:
  ```javascript
  client.flushall((err, success) => {
    if (err) {
      console.error("Error clearing Redis cache:", err);
    } else {
      console.log("Cache cleared:", success);
    }
  });
  ```

### Redis Setup

Ensure Redis is installed and running on your machine. By default, it runs on `localhost:6379`.

1. Install Redis:

   ```bash
   sudo apt install redis-server
   ```

2. Start Redis:

   ```bash
   sudo service redis-server start
   ```

3. Verify Redis is running:
   ```bash
   redis-cli ping
   ```
   Response: `PONG`

---

## Project Structure

```
.
├── src
│   ├── controllers
│   │   └── weatherController.js  # Handles API logic
│   ├── routes
│   │   └── weatherRoutes.js      # Defines routes
│   └── index.js                  # Entry point
├── tests
│   └── weatherController.test.js # Unit tests
├── .env                          # Environment variables (not committed)
├── .env.example                  # Example environment variables
├── package.json                  # Project metadata
├── README.md                     # Project documentation
```

---

## Running Tests

This project includes unit tests for the API endpoints using Jest and Supertest.

1. Run tests:

   ```bash
   npm test
   ```

2. Example test output:

   ```
   PASS  tests/weatherController.test.js
     Weather Controller
       ✓ should return current weather for a valid city (200 ms)
       ✓ should return an error for an invalid city (100 ms)
       ✓ should return a 5-day weather forecast for a valid city (150 ms)
       ✓ should return an error for an invalid city (120 ms)

   Test Suites: 1 passed, 1 total
   Tests:       4 passed, 4 total
   ```

---

## Error Handling

The API handles common errors such as:

- Invalid city names (e.g., a `500` error with an appropriate message).
- API connection issues or failures.

---

## Example `.env` File

```env
# OpenWeatherMap API Key
OPENWEATHER_API_KEY=your_api_key_here
```

---
