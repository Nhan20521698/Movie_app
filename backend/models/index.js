const sequelize = require("../config/db");

const Movie = require("./movie");
const Actor = require("./actor");
const Genre = require("./genres");

// relations
Movie.belongsToMany(Actor, {
  through: "movie_actors",
  foreignKey: "movie_id",
  otherKey: "actor_id"
});

Actor.belongsToMany(Movie, {
  through: "movie_actors",
  foreignKey: "actor_id",
  otherKey: "movie_id"
});

Movie.belongsToMany(Genre, {
  through: "movie_genres",
  foreignKey: "movie_id",
  otherKey: "genres_id"
});

Genre.belongsToMany(Movie, {
  through: "movie_genres",
  foreignKey: "genres_id",
  otherKey: "movie_id"
});

module.exports = {
  sequelize,
  Movie,
  Actor,
  Genre
};