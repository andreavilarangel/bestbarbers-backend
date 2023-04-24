/*
  Warnings:

  - Added the required column `zip_code` to the `address` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `latitude` on the `address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "zip_code" TEXT NOT NULL,
DROP COLUMN "latitude",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "geo_point" DROP NOT NULL;
