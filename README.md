# rental-scraper

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
