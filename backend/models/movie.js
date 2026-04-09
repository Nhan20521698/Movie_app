const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define("Movie", {
    title: DataTypes.STRING,
    release_date: DataTypes.DATE,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    director: DataTypes.STRING
});

module.exports = Movie;