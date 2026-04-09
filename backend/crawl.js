require("dotenv").config();
const axios = require("axios");
const mysql = require("mysql2/promise");

const API_KEY = process.env.TMDB_KEY;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

// cache để tránh query DB nhiều lần
const actorCache = new Map();
const genreCache = new Map();

async function insertActor(name) {
  if (actorCache.has(name)) return actorCache.get(name);

  const [rows] = await db.query("SELECT id FROM actors WHERE name = ?", [name]);

  let id;
  if (rows.length) {
    id = rows[0].id;
  } else {
    const [result] = await db.query(
      "INSERT INTO actors (name) VALUES (?)",
      [name]
    );
    id = result.insertId;
  }

  actorCache.set(name, id);
  return id;
}

async function insertGenre(name) {
  if (genreCache.has(name)) return genreCache.get(name);

  const [rows] = await db.query("SELECT id FROM genres WHERE name = ?", [name]);

  let id;
  if (rows.length) {
    id = rows[0].id;
  } else {
    const [result] = await db.query(
      "INSERT INTO genres (name) VALUES (?)",
      [name]
    );
    id = result.insertId;
  }

  genreCache.set(name, id);
  return id;
}

async function crawlPage(page) {
  const res = await axios.get("https://api.themoviedb.org/3/movie/popular", {
    params: { api_key: API_KEY, page }
  });

  const movies = res.data.results;

  await Promise.all(
    movies.map(async (m) => {
      try {
        const detail = await axios.get(
          `https://api.themoviedb.org/3/movie/${m.id}`,
          {
            params: {
              api_key: API_KEY,
              append_to_response: "credits"
            }
          }
        );

        const d = detail.data;

        const director =
          d.credits.crew.find((c) => c.job === "Director")?.name || "";

        // insert movie (tránh trùng)
        const [result] = await db.query(
          `INSERT INTO movies 
          (title, release_date, image, description, director) 
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE title=VALUES(title)`,
          [
            d.title,
            d.release_date,
            `https://image.tmdb.org/t/p/w500${d.poster_path}`,
            d.overview,
            director
          ]
        );

        const movieId = result.insertId;

        // actors
        for (let a of d.credits.cast.slice(0, 5)) {
          const actorId = await insertActor(a.name);
          await db.query(
            "INSERT IGNORE INTO movie_actors (movie_id, actor_id) VALUES (?, ?)",
            [movieId, actorId]
          );
        }

        // genres
        for (let g of d.genres) {
          const genreId = await insertGenre(g.name);
          await db.query(
            "INSERT IGNORE INTO movie_genres (movie_id, genres_id) VALUES (?, ?)",
            [movieId, genreId]
          );
        }

        console.log("✅", d.title);
      } catch (err) {
        console.error("❌ Error:", err.message);
      }
    })
  );
}

async function crawl() {
  for (let page = 1; page <= 25; page++) {
    console.log("🚀 Page:", page);
    await crawlPage(page);
  }

  console.log("DONE!");
  process.exit();
}

crawl();