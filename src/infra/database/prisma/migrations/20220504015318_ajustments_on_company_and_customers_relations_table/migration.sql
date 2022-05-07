/*
  Warnings:

  - You are about to drop the `CompanyEmails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyPhones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerEmails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerPhones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyEmails" DROP CONSTRAINT "CompanyEmails_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CompanyPhones" DROP CONSTRAINT "CompanyPhones_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CustomerEmails" DROP CONSTRAINT "CustomerEmails_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CustomerPhones" DROP CONSTRAINT "CustomerPhones_companyUid_fkey";

-- DropTable
DROP TABLE "CompanyEmails";

-- DropTable
DROP TABLE "CompanyPhones";

-- DropTable
DROP TABLE "CustomerEmails";

-- DropTable
DROP TABLE "CustomerPhones";

-- CreateTable
CREATE TABLE "CompanyPhone" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "companyUid" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyPhone_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "CompanyEmail" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "companyUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyEmail_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "CustomerEmail" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "companyUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerEmail_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "CustomerPhone" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "companyUid" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerPhone_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPhone_uid_key" ON "CompanyPhone"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyEmail_uid_key" ON "CompanyEmail"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerEmail_uid_key" ON "CustomerEmail"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerPhone_uid_key" ON "CustomerPhone"("uid");

-- AddForeignKey
ALTER TABLE "CompanyPhone" ADD CONSTRAINT "CompanyPhone_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmail" ADD CONSTRAINT "CompanyEmail_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerEmail" ADD CONSTRAINT "CustomerEmail_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Customer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPhone" ADD CONSTRAINT "CustomerPhone_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Customer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
