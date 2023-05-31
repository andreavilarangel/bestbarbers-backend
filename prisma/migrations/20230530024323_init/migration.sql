/*
  Warnings:

  - You are about to drop the column `product_service_id` on the `employees_products_and_services` table. All the data in the column will be lost.
  - Added the required column `product_and_service_id` to the `employees_products_and_services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employees_products_and_services" DROP CONSTRAINT "employees_products_and_services_product_service_id_fkey";

-- AlterTable
ALTER TABLE "employees_products_and_services" DROP COLUMN "product_service_id",
ADD COLUMN     "product_and_service_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "employees_products_and_services" ADD CONSTRAINT "employees_products_and_services_product_and_service_id_fkey" FOREIGN KEY ("product_and_service_id") REFERENCES "products_and_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
