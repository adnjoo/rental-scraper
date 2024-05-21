const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("apartment_prices.db", (err) => {
  if (err) {
    console.error("Could not open database", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS apartments (
      id    INTEGER PRIMARY KEY,
      name  TEXT
      owner TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS prices (
      id INTEGER PRIMARY KEY,
      apartment_id INTEGER,
      date TEXT,
      oneBedroomPrice TEXT,
      twoBedroomPrice TEXT,
      FOREIGN KEY(apartment_id) REFERENCES apartments(id)
    )
  `);
});

module.exports = db;
