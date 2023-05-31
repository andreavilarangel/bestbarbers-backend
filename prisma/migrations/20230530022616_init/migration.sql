-- CreateTable
CREATE TABLE "employees_products_and_services" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "employer_id" TEXT NOT NULL,
    "product_service_id" TEXT NOT NULL,
    "comission_percentage" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "time_required" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_products_and_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees_products_and_services" ADD CONSTRAINT "employees_products_and_services_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees_products_and_services" ADD CONSTRAINT "employees_products_and_services_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees_products_and_services" ADD CONSTRAINT "employees_products_and_services_product_service_id_fkey" FOREIGN KEY ("product_service_id") REFERENCES "products_and_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
