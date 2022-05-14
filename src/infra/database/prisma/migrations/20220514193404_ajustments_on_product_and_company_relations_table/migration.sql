/*
  Warnings:

  - You are about to drop the `CompanyCustomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyUid` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyUid` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyAddress" DROP CONSTRAINT "CompanyAddress_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CompanyCustomer" DROP CONSTRAINT "CompanyCustomer_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CompanyCustomer" DROP CONSTRAINT "CompanyCustomer_customerUid_fkey";

-- DropForeignKey
ALTER TABLE "CompanyEmail" DROP CONSTRAINT "CompanyEmail_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CompanyPhone" DROP CONSTRAINT "CompanyPhone_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CompanyUser" DROP CONSTRAINT "CompanyUser_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CompanyUser" DROP CONSTRAINT "CompanyUser_userUid_fkey";

-- DropForeignKey
ALTER TABLE "CustomerAddress" DROP CONSTRAINT "CustomerAddress_customerUid_fkey";

-- DropForeignKey
ALTER TABLE "CustomerEmail" DROP CONSTRAINT "CustomerEmail_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "CustomerPhone" DROP CONSTRAINT "CustomerPhone_companyUid_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productUid_fkey";

-- DropForeignKey
ALTER TABLE "VariantImage" DROP CONSTRAINT "VariantImage_variantUid_fkey";

-- DropForeignKey
ALTER TABLE "VariantType" DROP CONSTRAINT "VariantType_variantUid_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "companyUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "companyUid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "properties" JSONB[],
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "CompanyCustomer";

-- DropTable
DROP TABLE "VariantImage";

-- DropTable
DROP TABLE "VariantType";

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productUid_fkey" FOREIGN KEY ("productUid") REFERENCES "Product"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyAddress" ADD CONSTRAINT "CompanyAddress_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyPhone" ADD CONSTRAINT "CompanyPhone_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmail" ADD CONSTRAINT "CompanyEmail_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerEmail" ADD CONSTRAINT "CustomerEmail_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Customer"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPhone" ADD CONSTRAINT "CustomerPhone_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Customer"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customerUid_fkey" FOREIGN KEY ("customerUid") REFERENCES "Customer"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
