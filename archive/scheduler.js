const cron = require("node-cron");

const scrapePrices = require("./scraper");
const urls = require("./urls");

// Schedule the scraper to run once a day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running the scraper...");
  scrapePrices(urls);
});

// Run the scraper immediately on start
console.log("Running the scraper...");
scrapePrices(urls);
