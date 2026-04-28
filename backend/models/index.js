const sequelize = require("../config/db");

const Movie = require("./movie");
const Actor = require("./actor");
const Genre = require("./genre");
const User = require("./user");
const Favorite = require("./favorite");

// relations
// relations between Movie and Actor (many-to-many)
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

// relations between Movie and Genre (many-to-many)
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

// relations between User and Movie (many-to-many through Favorite)
Movie.belongsToMany(User, {
  through: Favorite,
  foreignKey: "movie_id",
  otherKey: "user_id",
  as: "LikedUsers"
});

User.belongsToMany(Movie, {
  through: Favorite,
  foreignKey: "user_id",
  otherKey: "movie_id",
  as: "FavoriteMovies"
});

// 🔥 THÊM VÀO CUỐI FILE

Favorite.belongsTo(Movie, {
  foreignKey: "movie_id"
});

Favorite.belongsTo(User, {
  foreignKey: "user_id"
});

Movie.hasMany(Favorite, {
  foreignKey: "movie_id"
});

User.hasMany(Favorite, {
  foreignKey: "user_id"
});

module.exports = {
  sequelize,
  Movie,
  Actor,
  Genre,
  User,
  Favorite
};