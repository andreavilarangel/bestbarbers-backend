/*
  Warnings:

  - The `canceled_at` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "canceled_at",
ADD COLUMN     "canceled_at" TIMESTAMP(3);
