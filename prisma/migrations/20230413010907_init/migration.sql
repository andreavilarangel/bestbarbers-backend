/*
  Warnings:

  - You are about to drop the column `cpf` on the `barbershops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "barbershops" DROP COLUMN "cpf",
ALTER COLUMN "payment_on_app_enabled" DROP NOT NULL,
ALTER COLUMN "payment_on_app_enabled" DROP DEFAULT,
ALTER COLUMN "payment_on_app_enabled" SET DATA TYPE TEXT;
