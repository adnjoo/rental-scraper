-- CreateTable
CREATE TABLE "Apartment" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "oneBedroom" TEXT NOT NULL,
    "twoBedroom" TEXT NOT NULL,
    "apartmentId" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
