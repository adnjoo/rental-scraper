const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const urls = require('./urls.js');

// CSV Writer configuration
const csvWriter = createCsvWriter({
  path: "apartment_prices.csv",
  header: [
    { id: "date", title: "DATE" },
    { id: "name", title: "APARTMENT_NAME" },
    { id: "oneBedroomPrice", title: "1_BEDROOM_PRICE" },
    { id: "twoBedroomPrice", title: "2_BEDROOM_PRICE" },
  ],
  append: true, // Append to the file if it exists
});

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

  // Write data to CSV
  await csvWriter.writeRecords(records);
};

// Schedule the scraper to run once a day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running the scraper...");
  scrapePrices();
});

// Run the scraper immediately on start
scrapePrices();
