import { Product } from "@src/domain/entities/Product"

export class ProductRepository {
  products: Product[]
  constructor(products: Product[]) {
    this.products = products
  }

  async create(product: Product): Promise<Product> {
    this.products.push(product)
    return product
  }
}
