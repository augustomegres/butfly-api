-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "observations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "CompanyCustomer" (
    "companyUid" TEXT NOT NULL,
    "customerUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyCustomer_pkey" PRIMARY KEY ("companyUid","customerUid")
);

-- CreateTable
CREATE TABLE "CustomerEmails" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "companyUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerEmails_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "CustomerPhones" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "companyUid" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerPhones_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "CustomerAddress" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "customerUid" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerAddress_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_uid_key" ON "Customer"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerEmails_uid_key" ON "CustomerEmails"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerPhones_uid_key" ON "CustomerPhones"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAddress_uid_key" ON "CustomerAddress"("uid");

-- AddForeignKey
ALTER TABLE "CompanyCustomer" ADD CONSTRAINT "CompanyCustomer_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Company"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCustomer" ADD CONSTRAINT "CompanyCustomer_customerUid_fkey" FOREIGN KEY ("customerUid") REFERENCES "Customer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerEmails" ADD CONSTRAINT "CustomerEmails_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Customer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerPhones" ADD CONSTRAINT "CustomerPhones_companyUid_fkey" FOREIGN KEY ("companyUid") REFERENCES "Customer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customerUid_fkey" FOREIGN KEY ("customerUid") REFERENCES "Customer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
