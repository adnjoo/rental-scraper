const { Builder, By, until } = require("selenium-webdriver");
const { PrismaClient } = require("@prisma/client");
const equityUrls = require("./equityUrls.js");
const prisma = new PrismaClient();

async function getApartmentInfo() {
  const date = new Date().toISOString();
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    for (const urlData of equityUrls.urls) {
      const { name, location } = urlData;
      await driver.get(urlData.url);
      await driver.wait(until.elementLocated(By.css(".col-lg-12 ul")), 10000);

      const pricesElements = await driver.findElements(
        By.css(".col-lg-12 ul li")
      );

      let studioPrice, oneBedroomPrice, twoBedroomPrice;

      for (const priceElement of pricesElements) {
        const bedroomType = await priceElement
          .findElement(By.css("strong"))
          .getText();

        const price = await priceElement.findElement(By.css("p")).getText();

        if (bedroomType.includes("Studio")) {
          studioPrice = price;
        } else if (bedroomType.includes("1 Bed")) {
          oneBedroomPrice = price;
        } else if (bedroomType.includes("2 Bed")) {
          twoBedroomPrice = price;
        }
      }

      // Insert apartment if it doesn't exist
      let apartment = await prisma.apartment.upsert({
        where: { name },
        update: { name },
        create: {
          name,
          owner: equityUrls.owner,
          state: "CA",
          locale: "SF Bay",
          area: location,
        },
      });

      // Insert price if it doesn't exist
      const price = await prisma.price.findFirst({
        where: { apartment: { name }, date },
      });

      if (!price) {
        await prisma.price.create({
          data: {
            studio: studioPrice,
            oneBedroom: oneBedroomPrice,
            twoBedroom: twoBedroomPrice,
            date,
            apartment: { connect: { name: apartment.name } },
          },
        });
      } else {
        console.log(`Price already collected on ${date}`);
        continue;
      }

      console.log(
        `Scraped ${name} - Studio Price: ${studioPrice}, - 1 Bedroom Price: ${oneBedroomPrice}, 2 Bedroom Price: ${twoBedroomPrice}`
      );
    }
  } catch (error) {
    console.error(`Error fetching or parsing the URL: ${error}`);
  } finally {
    await prisma.$disconnect();
    await driver.quit();
  }
}

getApartmentInfo();
