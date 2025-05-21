const client = require("../../config/redisClient");

const checkCache = async (req, res, next) => {
  const { city } = req.params;
  let cacheKey = req.originalUrl.split("/")[2] + city.toLowerCase();

  console.log(cacheKey);

  try {
    client.connect();
    const data = await client.get(cacheKey);
    client.quit();
    if (data) {
      console.log(`Cache hit for city: ${city}`);
      return res.json(JSON.parse(data));
    }
    console.log(`Cache miss for city: ${city}`);
    next();
  } catch (error) {
    console.error("Redis error:", error);
    return res.json({
      error: "Redis error",
      message: "An error occurred while checking the cache.",
    });
  }
};

module.exports = checkCache;
