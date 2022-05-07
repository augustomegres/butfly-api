import { Product } from "@entities/Product";
import { ProductVariant } from "@entities/ProductVariant";
import { IRepositoryFactory } from "@factories/interfaces/IRepositoryFactory";
import { IProductRepository } from "@repositories/Interfaces/IProductRepository";
import { AppError } from "@shared/errors/AppError";
import { v4 } from "uuid";

export class CreateProductUseCase {
  productRepository: IProductRepository;
  constructor(repositoryFactory: IRepositoryFactory) {
    this.productRepository = repositoryFactory.createProductRepository();
  }
  async execute({
    name,
    description,
    variants,
  }: {
    name: string;
    description?: string;
    variants: {
      type: string;
      images: string[];
      properties: { [key: string]: string }[];
      price: number;
    }[];
  }) {
    const productVariants: ProductVariant[] = [];
    variants.map((variant) => {
      productVariants.push(
        new ProductVariant({
          uid: v4(),
          type: variant.type,
          images: variant.images,
          properties: variant.properties,
          price: variant.price,
        })
      );
    });

    const product = new Product({
      uid: v4(),
      companyUid: "1234",
      name: name,
      description: description,
      variants: productVariants,
    });

    await this.productRepository.create(product);

    return product;
  }
}
