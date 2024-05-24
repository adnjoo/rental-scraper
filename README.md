# tern

helps renters find the best price for apartments

🥞:
• node.js
• selenium 4.x
• express 4.x
• prisma 5.x
• postgres

quickstart:

create a postgres database called e.g. apartments and put the connection string into .env like:

```
DATABASE_URL="postgresql://{username}:{password}.@localhost:5432/apartments"
```

then run:

```
git clone https://github.com/adnjoo/rental-scraper
cd rental-scraper
npm install
npx prisma migrate dev
npx prisma generate
npm run scrape-sf-ava
```
