/*
  Warnings:

  - You are about to drop the column `uid` on the `CompanyUser` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CompanyUser_uid_key";

-- AlterTable
ALTER TABLE "CompanyUser" DROP COLUMN "uid";
