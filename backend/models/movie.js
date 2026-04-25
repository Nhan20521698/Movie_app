const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define("Movie", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  release_date: DataTypes.DATE,
  duration: DataTypes.INTEGER,
  image: DataTypes.STRING,
  backdrop: DataTypes.STRING,
  director: DataTypes.STRING,
  rating: DataTypes.FLOAT,
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  trailer_url: DataTypes.STRING,
  country: DataTypes.STRING,
  tmdb_id: { type: DataTypes.INTEGER, unique: true }
}, { tableName: "movies",
  freezeTableName: true
});

module.exports = Movie;