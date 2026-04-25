require("dotenv").config();
const axios = require("axios");
const mysql = require("mysql2/promise");
const pLimit = require("p-limit").default;

const API_KEY = process.env.TMDB_KEY;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

const limit = pLimit(5);

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?background=111&color=fff&name=";

const actorCache = new Map();
const genreCache = new Map();

// ================= ACTOR =================
async function insertActor(actor) {
  const name = actor.name;

  if (actorCache.has(name)) return actorCache.get(name);

  const [rows] = await db.query(
    "SELECT id FROM actors WHERE name = ?",
    [name]
  );

  let id;

  if (rows.length) {
    id = rows[0].id;
  } else {
    const image = actor.profile_path
      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
      : DEFAULT_AVATAR + encodeURIComponent(name);

    const [result] = await db.query(
      `INSERT INTO actors (name, gender, profile_image) 
       VALUES (?, ?, ?)`,
      [
        name,
        actor.gender === 2 ? "Male" : "Female",
        image
      ]
    );

    id = result.insertId;
  }

  actorCache.set(name, id);
  return id;
}

// ================= GENRE =================
async function insertGenre(name) {
  if (genreCache.has(name)) return genreCache.get(name);

  const [rows] = await db.query(
    "SELECT id FROM genres WHERE name = ?",
    [name]
  );

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

// ================= MOVIE =================
async function processMovie(m) {
  try {
    const detail = await axios.get(
      `https://api.themoviedb.org/3/movie/${m.id}`,
      {
        params: {
          api_key: API_KEY,
          append_to_response: "credits,videos"
        }
      }
    );

    const d = detail.data;

    const director =
      d.credits.crew.find((c) => c.job === "Director")?.name || "Unknown";

    const country =
      d.production_countries?.map(c => c.name).join(", ") || "Unknown";

    // 🎬 trailer
    const trailerObj =
      d.videos?.results?.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      ) ||
      d.videos?.results?.find(v => v.site === "YouTube");

    const trailer = trailerObj
      ? `https://www.youtube.com/embed/${trailerObj.key}`
      : ""; // không null

    const rating = Math.round(d.vote_average * 10) / 10;

    const views = Math.floor(
      Math.min(1000000, d.vote_count * (50 + Math.random() * 100))
    );

    const likes = Math.floor(
      views * (0.05 + Math.random() * 0.15)
    );

    // 🔥 FIX QUAN TRỌNG: dùng tmdb_id
    const [result] = await db.query(
      `INSERT INTO movies (
        tmdb_id, title, release_date, image, backdrop,
        description, director, rating, duration,
        views, likes, trailer_url, country
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        rating = VALUES(rating),
        views = VALUES(views),
        likes = VALUES(likes),
        trailer_url = VALUES(trailer_url),
        country = VALUES(country)`,
      [
        d.id, // ✅ cực kỳ quan trọng
        d.title,
        d.release_date,
        `https://image.tmdb.org/t/p/w500${d.poster_path}`,
        `https://image.tmdb.org/t/p/original${d.backdrop_path}`,
        d.overview,
        director,
        rating,
        d.runtime,
        views,
        likes,
        trailer,
        country
      ]
    );

    // 🔥 lấy đúng movie bằng tmdb_id
    const [rows] = await db.query(
      "SELECT id FROM movies WHERE tmdb_id = ?",
      [d.id]
    );

    if (!rows.length) return;

    const movieId = rows[0].id;

    // ACTORS
    for (let a of d.credits.cast.slice(0, 5)) {
      const actorId = await insertActor(a);

      await db.query(
        "INSERT IGNORE INTO movie_actors (movie_id, actor_id) VALUES (?, ?)",
        [movieId, actorId]
      );
    }

    // GENRES
    for (let g of d.genres) {
      const genreId = await insertGenre(g.name);

      await db.query(
        "INSERT IGNORE INTO movie_genres (movie_id, genre_id) VALUES (?, ?)",
        [movieId, genreId]
      );
    }

    console.log("✅", d.title);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

// ================= PAGE =================
async function crawlPage(page) {
  console.log("🚀 Page:", page);

  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/popular",
    {
      params: { api_key: API_KEY, page }
    }
  );

  const movies = res.data.results;

  await Promise.all(
    movies.map((m) => limit(() => processMovie(m)))
  );
}

// ================= MAIN =================
async function crawl() {
  for (let page = 1; page <= 90; page++) {
    await crawlPage(page);
  }

  console.log("🎉 DONE!");
  process.exit();
}

crawl();