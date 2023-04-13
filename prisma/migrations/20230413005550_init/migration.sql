-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "inactive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "barbershop_signature_members" ALTER COLUMN "inactive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "barbershop_transactions" ALTER COLUMN "inactive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "barbershops" ALTER COLUMN "inactive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "inactive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "inactive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payment_methods" ALTER COLUMN "inactive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products_and_services" ALTER COLUMN "inactive" DROP NOT NULL;
