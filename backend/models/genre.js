const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Genre = sequelize.define("Genre", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING
}, 
{ tableName: "genres",
  freezeTableName: true
});

module.exports = Genre;