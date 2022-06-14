import { ProductVariant } from "@src/domain/entities/ProductVariant";

interface CreateProductData {
  uid: string;
  name: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
}

export interface IProductRepository {
  create(CreateProductData): Promise<Product>;
}
