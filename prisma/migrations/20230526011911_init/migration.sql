/*
  Warnings:

  - Added the required column `due_in_days` to the `payment_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_methods" ADD COLUMN     "due_in_days" INTEGER NOT NULL;
