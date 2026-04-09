const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Genres = sequelize.define("Genres", {
    name: { type: DataTypes.STRING, unique: true}
});

module.exports = Genres;