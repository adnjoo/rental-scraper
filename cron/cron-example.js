const cron = require("node-cron");

// every second
cron.schedule("* * * * * *", async () => {
    console.log(new Date());
});
