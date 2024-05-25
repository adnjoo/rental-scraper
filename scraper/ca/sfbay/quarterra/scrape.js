const { Builder, By, until } = require("selenium-webdriver");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const urls = require("./quarterraUrls.js");

const scrapePrices = async () => {
  const date = new Date().toISOString();

  let options = new chrome.Options();
  options.addArguments("--headless"); // Run in headless mode
  options.addArguments("--disable-gpu"); // Disable GPU hardware acceleration
  options.addArguments("--no-sandbox"); // Bypass OS security model
  options.addArguments("--disable-dev-shm-usage"); // Overcome limited resource problems
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  try {
    for (const { url, name, location } of urls.urls) {
      await driver.get(url);
      await driver.wait(
        until.elementLocated(By.css(".card__stats.coh-style-heading-5-size")),
        10000
      );

      const oneBedroomElement = await driver.findElement(
        By.xpath(
          "//ul[contains(@class, 'card__stats') and contains(@class, 'coh-style-heading-5-size')]/li[contains(text(), 'Starting at')]"
        )
      );
      const oneBedroomPrice = await oneBedroomElement.getText();

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
            date: new Date(date),
            oneBedroom: oneBedroomPrice.replace("Starting at ", ""),
            apartment: { connect: { id: apartment.id } },
          },
        });
      } else {
        console.log(`Price already collected on ${date}`);
        continue;
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
