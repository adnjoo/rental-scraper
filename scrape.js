const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
const sqlite3 = require("sqlite3").verbose();
const urls = require("./urls.js");

// Open SQLite database
const db = new sqlite3.Database("apartment_prices.db", (err) => {
  if (err) {
    console.error("Could not open database", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS apartment_prices (
    date TEXT,
    name TEXT,
    oneBedroomPrice TEXT,
    twoBedroomPrice TEXT
  )
`);

// Function to scrape prices
const scrapePrices = async () => {
  const date = new Date().toISOString().split("T")[0];
  const records = [];

  for (const { url, name } of urls) {
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // Selectors for pricing elements
      const oneBedroomPrice =
        $("#pricing-1-bedroom-price").text().trim() || "N/A";
      const twoBedroomPrice =
        $("#pricing-2-bedroom-price").text().trim() || "N/A";

      records.push({ date, name, oneBedroomPrice, twoBedroomPrice });

      console.log(
        `Scraped ${name} - 1 Bedroom Price: ${oneBedroomPrice}, 2 Bedroom Price: ${twoBedroomPrice}`
      );
    } catch (error) {
      console.error(`Error fetching the URL for ${name}: ${error}`);
      records.push({
        date,
        name,
        oneBedroomPrice: "Error",
        twoBedroomPrice: "Error",
      });
    }
  }

  // Insert records into the SQLite database
  const insert = db.prepare(`
    INSERT INTO apartment_prices (date, name, oneBedroomPrice, twoBedroomPrice) 
    VALUES (?, ?, ?, ?)
  `);

  for (const record of records) {
    insert.run(
      record.date,
      record.name,
      record.oneBedroomPrice,
      record.twoBedroomPrice
    );
  }

  insert.finalize();
};

// Schedule the scraper to run once a day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running the scraper...");
  scrapePrices();
});

// Run the scraper immediately on start
scrapePrices();
