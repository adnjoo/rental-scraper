const cron = require("node-cron");

// every day
cron.schedule("0 0 * * *", async () => {
    const { scrapePrices } = require("../sfbay/scrape.js");
    await scrapePrices();
})
