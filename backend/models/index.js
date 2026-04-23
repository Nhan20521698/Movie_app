const sequelize = require("../config/db");

const Movie = require("./movie");
const Actor = require("./actor");
const Genre = require("./genre");
const User = require("./user");

// relations
Movie.belongsToMany(Actor, {
  through: "movie_actors",
  foreignKey: "movie_id",
  otherKey: "actor_id",
  as: "Actors"
});

Actor.belongsToMany(Movie, {
  through: "movie_actors",
  foreignKey: "actor_id",
  otherKey: "movie_id",
  as: "Movies"
});

Movie.belongsToMany(Genre, {
  through: "movie_genres",
  foreignKey: "movie_id",
  otherKey: "genre_id",
  as: "Genres"
});

Genre.belongsToMany(Movie, {
  through: "movie_genres",
  foreignKey: "genre_id",
  otherKey: "movie_id",
  as: "Movies"
});

module.exports = {
  sequelize,
  Movie,
  Actor,
  Genre,
  User
};