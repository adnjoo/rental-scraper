const axios = require("axios");
const cheerio = require("cheerio");

const urls = require("./avalonUrls.js");
const db = require("../database.js");

const scrapePrices = async () => {
  const date = new Date().toISOString().split("T")[0];

  for (const { url, name } of urls.urls) {
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // Selectors for pricing elements
      const oneBedroomPrice =
        $("#pricing-1-bedroom-price").text().trim() || "N/A";
      const twoBedroomPrice =
        $("#pricing-2-bedroom-price").text().trim() || "N/A";

      // Insert apartment if it doesn't exist
      db.run(
        `
        INSERT OR IGNORE INTO apartments (name) VALUES (?)
      `,
        [name],
        function (err) {
          if (err) {
            console.error(`Error inserting apartment ${name}: ${err}`);
            return;
          }

          const apartmentId = this.lastID;

          // Insert price
          db.run(
            `
          INSERT INTO prices (apartment_id, date, oneBedroomPrice, twoBedroomPrice) 
          VALUES (?, ?, ?, ?)
        `,
            [apartmentId, date, oneBedroomPrice, twoBedroomPrice],
            function (err) {
              if (err) {
                console.error(`Error inserting price for ${name}: ${err}`);
                return;
              }
              console.log(
                `Scraped ${name} - 1 Bedroom Price: ${oneBedroomPrice}, 2 Bedroom Price: ${twoBedroomPrice}`
              );
            }
          );
        }
      );
    } catch (error) {
      console.error(`Error fetching the URL for ${name}: ${error}`);
    } finally {
      console.log(`Scraped ${name}`);
    }
  }
};

scrapePrices();
