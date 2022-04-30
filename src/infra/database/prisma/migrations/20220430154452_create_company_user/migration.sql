/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CompanyAddress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyId` on the `CompanyAddress` table. All the data in the column will be lost.
  - The primary key for the `CompanyEmails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyId` on the `CompanyEmails` table. All the data in the column will be lost.
  - The primary key for the `CompanyPhones` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyId` on the `CompanyPhones` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `companyUid` to the `CompanyAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyUid` to the `CompanyEmails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyUid` to the `CompanyPhones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyAddress" DROP CONSTRAINT "CompanyAddress_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyEmails" DROP CONSTRAINT "CompanyEmails_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyPhones" DROP CONSTRAINT "CompanyPhones_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "CompanyAddress" DROP CONSTRAINT "CompanyAddress_pkey",
DROP COLUMN "companyId",
ADD COLUMN     "companyUid" TEXT NOT NULL,
ADD CONSTRAINT "CompanyAddress_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "CompanyEmails" DROP CONSTRAINT "CompanyEmails_pkey",
DROP COLUMN "companyId",
ADD COLUMN     "companyUid" TEXT NOT NULL,
ADD CONSTRAINT "CompanyEmails_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "CompanyPhones" DROP CONSTRAINT "CompanyPhones_pkey",
DROP COLUMN "companyId",
ADD COLUMN     "companyUid" TEXT NOT NULL,
ADD CONSTRAINT "CompanyPhones_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uid");

-- CreateTable
CREATE TABLE "CompanyUser" (
    "userUid" TEXT NOT NULL,
    "companyUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyUser_pkey" PRIMARY KEY ("userUid","companyUid")
);

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAddress" ADD CONSTRAINT "CompanyAddress_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPhones" ADD CONSTRAINT "CompanyPhones_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmails" ADD CONSTRAINT "CompanyEmails_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
