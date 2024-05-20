const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const url =
  "https://www.avaloncommunities.com/california/fremont-apartments/avalon-fremont/";

// CSV Writer configuration
const csvWriter = createCsvWriter({
  path: "apartment_prices.csv",
  header: [
    { id: "date", title: "DATE" },
    { id: "oneBedroomPrice", title: "1_BEDROOM_PRICE" },
    { id: "twoBedroomPrice", title: "2_BEDROOM_PRICE" },
  ],
  append: true, // Append to the file if it exists
});

// Function to scrape prices
const scrapePrices = async () => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Selectors for pricing elements
    const oneBedroomPrice = $("#pricing-1-bedroom-price").text().trim();
    const twoBedroomPrice = $("#pricing-2-bedroom-price").text().trim();

    const date = new Date().toISOString().split("T")[0];

    // Write data to CSV
    await csvWriter.writeRecords([{ date, oneBedroomPrice, twoBedroomPrice }]);

    console.log(`1 Bedroom Price: ${oneBedroomPrice}`);
    console.log(`2 Bedroom Price: ${twoBedroomPrice}`);
  } catch (error) {
    console.error(`Error fetching the URL: ${error}`);
  }
};

// Schedule the scraper to run once a day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running the scraper...");
  scrapePrices();
});

// Run the scraper immediately on start
scrapePrices();
