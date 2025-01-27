const express = require("express");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const weatherRoutes = require("./routes/weatherRoutes.js");

app.use("/weather", weatherRoutes);

app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
