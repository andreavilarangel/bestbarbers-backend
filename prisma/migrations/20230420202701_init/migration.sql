/*
  Warnings:

  - You are about to drop the column `image_profile_url` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "barbershops" ADD COLUMN     "profile_image_url" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "image_profile_url",
ADD COLUMN     "profile_image_url" TEXT;
