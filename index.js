const express = require("express");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const apartments = await prisma.apartment.findMany();
    res.json(apartments);
  } catch (error) {
    console.error("Error fetching apartments:", error);
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
