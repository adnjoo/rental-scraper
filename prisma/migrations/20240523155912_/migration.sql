-- CreateTable
CREATE TABLE "Floorplan" (
    "id" TEXT NOT NULL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "sqft" INTEGER,
    "apartmentId" TEXT NOT NULL,

    CONSTRAINT "Floorplan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Floorplan" ADD CONSTRAINT "Floorplan_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
