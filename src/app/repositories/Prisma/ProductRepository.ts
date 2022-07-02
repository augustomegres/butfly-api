import { Product } from "@src/domain/entities/Product"
import { PrismaClient } from "@prisma/client"
import { IProductRepository } from "@app/contracts/repositories/IProductRepository"

export class ProductRepository implements IProductRepository {
  database: PrismaClient
  constructor(prismaDatabase: PrismaClient) {
    this.database = prismaDatabase
  }
  async create(data: Product): Promise<Product> {
    await this.database.product.create({
      data: {
        uid: data.uid,
        companyUid: data.companyUid,
        name: data.name,
        description: data.description,
        variant: { createMany: { data: [...data.variants] } },
      },
    })

    return data
  }
}
