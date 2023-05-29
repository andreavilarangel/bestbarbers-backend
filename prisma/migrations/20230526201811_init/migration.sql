/*
  Warnings:

  - The `type` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('recepcionist', 'manager', 'collector', 'finance', 'barber', 'barbershop_owner', 'barbershop_owner_and_barber', 'client');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'barbershop_owner';
