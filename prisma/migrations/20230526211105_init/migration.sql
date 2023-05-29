/*
  Warnings:

  - You are about to drop the column `barbershopOpeningHoursId` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "barbershopOpeningHoursId";

-- AlterTable
ALTER TABLE "products_and_services" ADD COLUMN     "appointmentId" TEXT;

-- AddForeignKey
ALTER TABLE "products_and_services" ADD CONSTRAINT "products_and_services_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
