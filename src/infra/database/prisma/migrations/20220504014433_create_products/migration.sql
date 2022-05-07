-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "productUid" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "VariantType" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "variantUid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantType_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "VariantImage" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "variantUid" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantImage_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_uid_key" ON "Product"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_uid_key" ON "Variant"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "VariantType_uid_key" ON "VariantType"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "VariantImage_uid_key" ON "VariantImage"("uid");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productUid_fkey" FOREIGN KEY ("productUid") REFERENCES "Product"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantType" ADD CONSTRAINT "VariantType_variantUid_fkey" FOREIGN KEY ("variantUid") REFERENCES "Variant"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantImage" ADD CONSTRAINT "VariantImage_variantUid_fkey" FOREIGN KEY ("variantUid") REFERENCES "Variant"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
