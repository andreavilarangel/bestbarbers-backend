-- DropForeignKey
ALTER TABLE "employees_products_and_services" DROP CONSTRAINT "employees_products_and_services_employer_id_fkey";

-- AddForeignKey
ALTER TABLE "employees_products_and_services" ADD CONSTRAINT "employees_products_and_services_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
