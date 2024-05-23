const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const cheerio = require("cheerio");

const urls = require("./avalonUrls.js");

const prisma = new PrismaClient();

const scrapePrices = async () => {
  const date = new Date().toISOString();

  for (const { url, name, location } of urls.urls) {
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
      let apartment = await prisma.apartment.upsert({
        where: { name },
        update: { name },
        create: {
          name,
          owner: urls.owner,
          state: "CA",
          locale: "SF Bay",
          area: location,
        },
      });

      let price = await prisma.price.findFirst({
        where: { apartment: { name }, date },
      });

      if (!price) {
        // Insert price
        await prisma.price.create({
          data: {
            oneBedroom: oneBedroomPrice,
            twoBedroom: twoBedroomPrice,
            apartment: { connect: { name: apartment.name } },
          },
        });
      } else {
        throw new Error(`Price already collected on ${date}`);
      }

      console.log(
        `Scraped ${name} - 1 Bedroom Price: ${oneBedroomPrice}, 2 Bedroom Price: ${twoBedroomPrice}`
      );
    } catch (error) {
      console.error(`Error fetching or parsing the URL for ${name}: ${error}`);
    }
  }
};

scrapePrices()
  .catch((error) => {
    console.error("Error scraping prices:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
