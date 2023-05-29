/*
  Warnings:

  - You are about to drop the column `promotion_days` on the `products_and_services` table. All the data in the column will be lost.
  - You are about to drop the column `promotion_value` on the `products_and_services` table. All the data in the column will be lost.
  - Added the required column `default_comission` to the `products_and_services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products_and_services" DROP COLUMN "promotion_days",
DROP COLUMN "promotion_value",
ADD COLUMN     "default_comission" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "time_required" DROP NOT NULL;
