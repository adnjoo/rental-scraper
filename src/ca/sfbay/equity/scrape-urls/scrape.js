const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

async function scrapeEquityApartments() {
  // Set up the Chrome WebDriver
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the Equity Apartments page
    await driver.get('https://www.equityapartments.com/san-francisco-bay-apartments');

    // Wait for the community cards to be visible
    await driver.sleep(5000); // Wait for the page to fully load

    // Find all property cards
    let propertyCards = await driver.findElements(By.css('div[itemtype="http://schema.org/ApartmentComplex"]'));

    let urls = [];

    for (let card of propertyCards) {
      // Extract the property name
      let nameElement = await card.findElement(By.css('h3[itemprop="name"] a'));
      let name = await nameElement.getText();
      let url = await nameElement.getAttribute('href');
      
      // Extract the property location
      let locationElement = await card.findElement(By.css('span[itemprop="addressLocality"]'));
      let location = await locationElement.getText();

      // Push the extracted data to the urls array
      urls.push({
        url: url,
        name: name,
        location: location
      });
    }

    // Write the data to a JSON file
    fs.writeFileSync('equity_apartments.json', JSON.stringify({ urls }, null, 2), 'utf-8');
    console.log('Data successfully written to equity_apartments.json');
  } finally {
    // Quit the driver
    await driver.quit();
  }
}

scrapeEquityApartments();
