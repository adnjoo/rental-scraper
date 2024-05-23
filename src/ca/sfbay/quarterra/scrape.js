const { Builder, By, until } = require('selenium-webdriver');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const urls = require('./quarterraUrls.js');

const scrapePrices = async () => {
  const date = new Date().toISOString();

  let driver = await new Builder().forBrowser('chrome').build();
  try {
    for (const { url, name } of urls.urls) {
      await driver.get(url);
      await driver.wait(until.elementLocated(By.css('.card__stats.coh-style-heading-5-size')), 10000);

      const oneBedroomElement = await driver.findElement(By.xpath("//ul[contains(@class, 'card__stats') and contains(@class, 'coh-style-heading-5-size')]/li[contains(text(), 'Starting at')]"));
      const oneBedroomPrice = await oneBedroomElement.getText();

      console.log(oneBedroomPrice);

      // Insert apartment if it doesn't exist
      let apartment = await prisma.apartment.upsert({
        where: { name },
        update: { name },
        create: { name, owner: urls.owner },
      });

      let price = await prisma.price.findFirst({
        where: { apartment: { name }, date },
      });

      if (!price) {
        // Insert price
        await prisma.price.create({
          data: {
            date: new Date(date),
            oneBedroom: oneBedroomPrice.replace('Starting at ', ''),
            apartment: { connect: { id: apartment.id } },
          },
        });
      } else {
        throw new Error(`Price already collected on ${date}`);
      }

      console.log(`Scraped ${name} - 1 Bedroom Price: ${oneBedroomPrice}`);
    }
  } catch (error) {
    console.error(`Error fetching or parsing the URL: ${error}`);
  } finally {
    await driver.quit();
    await prisma.$disconnect();
  }
};

scrapePrices().catch((error) => {
  console.error("Error scraping prices:", error);
});
