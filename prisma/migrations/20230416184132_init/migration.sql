/*
  Warnings:

  - Made the column `user_id` on table `barbershops` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `barbershops` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "barbershops" DROP CONSTRAINT "barbershops_user_id_fkey";

-- AlterTable
ALTER TABLE "barbershops" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "barbershops" ADD CONSTRAINT "barbershops_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
