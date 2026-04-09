require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");


const movieRoutes = require("./routes/movie.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/movies", movieRoutes);

sequelize.authenticate().then(() => {
  console.log("DB connected");
  app.listen(5000, () => console.log("Server running"));
});