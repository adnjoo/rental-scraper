quickstart:

create a postgres database called e.g. `apartments` and put the connection string into .env like:

```bash
DATABASE_URL="postgresql://{username}:{password}.@localhost:5432/apartments"
```

to scrape, run:
```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run scrape-all
```

to run server:
```bash
npm run server
```