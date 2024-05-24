const prisma = require("../prismaClient");

async function getAreas(req, res) {
  try {
    const apartments = await prisma.apartment.findMany({
      select: {
        area: true,
      },
    });

    const areas = [...new Set(apartments.map((apartment) => apartment.area))];

    res.json({
      count: areas.length,
      areas,
    });
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAreas,
};
