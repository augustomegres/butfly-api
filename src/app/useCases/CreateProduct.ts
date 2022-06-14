import { Product } from "@src/domain/entities/Product";
import { ProductVariant } from "@src/domain/entities/ProductVariant";
import { IRepositoryFactory } from "@app/contracts/factories/IRepositoryFactory";
import { IProductRepository } from "@app/contracts/repositories/IProductRepository";
import { v4 } from "uuid";

export class CreateProductUseCase {
  productRepository: IProductRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.productRepository = repositoryFactory.createProductRepository();
  }
  async execute({
    companyUid,
    name,
    description,
    variants,
  }: {
    companyUid: string;
    name: string;
    description?: string;
    variants: {
      images: string[];
      properties: { [key: string]: string }[];
      price: number;
      quantity: number;
    }[];
  }) {
    const productVariants: ProductVariant[] = [];
    variants.map((variant) => {
      productVariants.push(
        new ProductVariant({
          uid: v4(),
          images: variant.images,
          properties: variant.properties,
          price: variant.price,
          quantity: variant.quantity,
        })
      );
    });

    const product = new Product({
      uid: v4(),
      companyUid: companyUid,
      name: name,
      description: description,
      variants: productVariants,
    });

    await this.productRepository.create(product);

    return product;
  }
}
