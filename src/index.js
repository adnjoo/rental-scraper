const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

const areasRouter=  require('./routes/areas');

app.get("/", async (req, res) => {
  try {
    const apartments = await prisma.apartment.findMany({
      select: {
        name: true,
        owner: true,
        area: true,
      },
    });
    res.json({
      count: apartments.length,
      apartments,
    });
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/owners", async (req, res) => {
  try {
    const apartments = await prisma.apartment.findMany({
      select: {
        owner: true,
        name: true,
        area: true,
      },
    });

    const owners = apartments.reduce((acc, apartment) => {
      const { owner, id, name } = apartment;
      if (!acc[owner]) {
        acc[owner] = { owner, apartments: [], count: 0 };
      }
      acc[owner].count++;
      acc[owner].apartments.push({ area: apartment.area, name, id });
      return acc;
    }, {});

    res.json(Object.values(owners));
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/prices/", async (req, res) => {
  try {
    const prices = await prisma.price.findMany();
    res.json({
      count: prices.length,
      prices,
    });
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/prices/:apartmentName", async (req, res) => {
  const { apartmentName } = req.params;

  try {
    const apartment = await prisma.apartment.findUnique({
      where: {
        name: apartmentName,
      },
      include: {
        prices: true,
      },
    });

    if (!apartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    res.json(apartment.prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/areas", areasRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
