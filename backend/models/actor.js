const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Actor = sequelize.define("Actor", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  birthday: DataTypes.DATE,
  gender: DataTypes.STRING,
  profile_image: DataTypes.STRING,
  bio: DataTypes.TEXT
}, 
{ tableName: "actors",
  freezeTableName: true
});

module.exports = Actor;