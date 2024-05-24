const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

async function scrapeAvalonCommunities() {
  // Set up the Chrome WebDriver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the Avalon Communities page
    await driver.get('https://www.avaloncommunities.com/northern-california/');

    // Find all community cards
    let communityCards = await driver.findElements(By.css('.community-card-info'));

    let urls = [];

    for (let card of communityCards) {
      let nameElement = await card.findElement(By.css('.community-card-name a'));
      let name = await nameElement.getText();
      let url = await nameElement.getAttribute('href');
      let locationElement = await card.findElement(By.css('.font-weight-light.font-14'));
      let location = await locationElement.getText();

      urls.push({
        url: url,
        name: name,
        location: location.split('•')[1].split(',')[0].trim()
      });
    }

    // Write the data to a JSON file
    fs.writeFileSync('avalon_communities.json', JSON.stringify({ urls }, null, 2), 'utf-8');
    console.log('Data successfully written to avalon_communities.json');
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

scrapeAvalonCommunities();
