-- CreateEnum
CREATE TYPE "ProductAndServiceType" AS ENUM ('service', 'club_service', 'product');

-- CreateEnum
CREATE TYPE "AppointmentTypes" AS ENUM ('normal', 'fit', 'club');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('awaiting', 'pending', 'finished');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('pending', 'payed', 'received');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "birth_date" TEXT,
    "profile_image_url" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "push_ids" TEXT,
    "register_by" TEXT,
    "last_login" TEXT,
    "met_through" TEXT,
    "cupom" TEXT,
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbershops" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cnpj" TEXT,
    "phone" TEXT,
    "rating" DOUBLE PRECISION,
    "agenda_interval" INTEGER,
    "status" TEXT,
    "slug" TEXT,
    "profile_image_url" TEXT,
    "trial_start_date" TEXT,
    "trial_end_date" TEXT,
    "account_status" TEXT,
    "subscription_status" TEXT,
    "payment_issue_date" TEXT,
    "last_payment_date" TEXT,
    "payments_counter" INTEGER,
    "asaas_barbershop_id" TEXT,
    "asaas_token_access" TEXT,
    "payment_on_app_enabled" TEXT,
    "signature_club_enabled" BOOLEAN DEFAULT false,
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barbershops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbershop_opening_hours" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "day_reference" TEXT NOT NULL,
    "start_hour" TEXT NOT NULL DEFAULT '08:00:00',
    "finish_hour" TEXT NOT NULL DEFAULT '20:00:00',
    "is_closed" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barbershop_opening_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "user_id" TEXT,
    "asaas_employer_id" TEXT,
    "created_by_user_id" TEXT,
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "asaas_client_id" TEXT,
    "created_by_user_id" TEXT,
    "payment_card_info" TEXT,
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_and_services" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "time_required" TEXT NOT NULL,
    "type" "ProductAndServiceType" NOT NULL DEFAULT 'service',
    "promotion_days" TEXT,
    "promotion_value" DOUBLE PRECISION,
    "product_category_id" TEXT,
    "image_url" TEXT,
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_and_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "discounted_from_barber" BOOLEAN NOT NULL DEFAULT true,
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocked_times" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "employer_id" TEXT,
    "all_employees" BOOLEAN,
    "date" TEXT,
    "start_hour" TEXT NOT NULL,
    "finish_hour" TEXT NOT NULL,
    "repeat_every_day" BOOLEAN NOT NULL,
    "repeat_every_week_day" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocked_times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT,
    "client_id" TEXT,
    "zip_code" TEXT NOT NULL,
    "title" TEXT,
    "street" TEXT NOT NULL,
    "street_number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "geo_point" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbershop_clients" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barbershop_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbershop_clients_observations" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barbershop_clients_observations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbershop_signature_members" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "signature_status" TEXT NOT NULL,
    "due_date" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "finish_date" TEXT,
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barbershop_signature_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "employer_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "start_hour" TEXT NOT NULL,
    "finish_hour" TEXT NOT NULL,
    "type" "AppointmentTypes" NOT NULL DEFAULT 'normal',
    "status" "AppointmentStatus" NOT NULL DEFAULT 'awaiting',
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "barbershopOpeningHoursId" TEXT,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbershop_transactions" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "employer_id" TEXT,
    "appointment_id" TEXT,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'pending',
    "gross_value" DOUBLE PRECISION NOT NULL,
    "discount_offered" DOUBLE PRECISION NOT NULL,
    "discount_observation" TEXT NOT NULL,
    "barber_value" DOUBLE PRECISION NOT NULL,
    "payment_method_value" DOUBLE PRECISION NOT NULL,
    "net_value" DOUBLE PRECISION NOT NULL,
    "inactive" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "barbershopOpeningHoursId" TEXT,

    CONSTRAINT "barbershop_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments_products_and_services" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "employer_id" TEXT,
    "appointment_id" TEXT,
    "product_service_id" TEXT NOT NULL,
    "employer_percentage" DOUBLE PRECISION NOT NULL,
    "employer_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "barbershopOpeningHoursId" TEXT,

    CONSTRAINT "appointments_products_and_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments_payment_methods" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "payment_method_id" TEXT NOT NULL,
    "appointment_id" TEXT,
    "payment_method_percentage" DOUBLE PRECISION NOT NULL,
    "payment_method_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointments_payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments_reviews" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "employer_id" TEXT,
    "rate" TEXT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "barbershopOpeningHoursId" TEXT,

    CONSTRAINT "appointments_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "barbershops" ADD CONSTRAINT "barbershops_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_opening_hours" ADD CONSTRAINT "barbershop_opening_hours_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_and_services" ADD CONSTRAINT "products_and_services_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocked_times" ADD CONSTRAINT "blocked_times_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocked_times" ADD CONSTRAINT "blocked_times_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_clients" ADD CONSTRAINT "barbershop_clients_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_clients" ADD CONSTRAINT "barbershop_clients_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_clients_observations" ADD CONSTRAINT "barbershop_clients_observations_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_clients_observations" ADD CONSTRAINT "barbershop_clients_observations_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_signature_members" ADD CONSTRAINT "barbershop_signature_members_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_signature_members" ADD CONSTRAINT "barbershop_signature_members_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_signature_members" ADD CONSTRAINT "barbershop_signature_members_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "products_and_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_transactions" ADD CONSTRAINT "barbershop_transactions_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_transactions" ADD CONSTRAINT "barbershop_transactions_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_transactions" ADD CONSTRAINT "barbershop_transactions_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_transactions" ADD CONSTRAINT "barbershop_transactions_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_products_and_services" ADD CONSTRAINT "appointments_products_and_services_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_products_and_services" ADD CONSTRAINT "appointments_products_and_services_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_products_and_services" ADD CONSTRAINT "appointments_products_and_services_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_products_and_services" ADD CONSTRAINT "appointments_products_and_services_product_service_id_fkey" FOREIGN KEY ("product_service_id") REFERENCES "products_and_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_payment_methods" ADD CONSTRAINT "appointments_payment_methods_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_payment_methods" ADD CONSTRAINT "appointments_payment_methods_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_payment_methods" ADD CONSTRAINT "appointments_payment_methods_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_reviews" ADD CONSTRAINT "appointments_reviews_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_reviews" ADD CONSTRAINT "appointments_reviews_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments_reviews" ADD CONSTRAINT "appointments_reviews_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
