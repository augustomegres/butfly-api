import { AppError } from "@infra/shared/errors/AppError";
import { ProductVariant } from "./ProductVariant";

export class Product {
  uid: string;
  companyUid: string;
  name: string;
  description?: string;
  variants: ProductVariant[];

  constructor({
    uid,
    companyUid,
    name,
    description,
    variants,
  }: {
    uid: string;
    companyUid: string;
    name: string;
    description?: string;
    variants: ProductVariant[];
  }) {
    this.validateVariants(variants);
    this.validateName(name);

    this.uid = uid;
    this.companyUid = companyUid;
    this.name = name;
    this.description = description;
    this.variants = variants;
  }

  validateName(name: string) {
    if (!name || name?.length < 3)
      throw new AppError("Name must be at least 3 characters");

    if (name.length > 50)
      throw new AppError("Name must be at most 50 characters");

    if (!/^[a-zA-Z0-9 ]+$/.test(name))
      throw new AppError("Name must only contain letters and numbers");
  }

  validatePrice(price: number) {
    if (price < 0) throw new AppError("Price must be greater than 0");
    if (isNaN(price))
      throw new AppError("You must provide a valid product price");
  }

  validateVariants(variants: ProductVariant[]) {
    variants.forEach((variant) => {
      this.validatePrice(variant.price);
    });
    const keyOccurrences: { [key: string]: number } = {};
    variants.map((variant) => {
      variant.properties.map((variantObject) => {
        keyOccurrences[variantObject.key] =
          (keyOccurrences[variantObject.key] || 0) + 1;
      });
    });
    Object.keys(keyOccurrences).forEach((key) => {
      const totalVariants = variants.length;
      variants.forEach(() => {
        if (totalVariants !== keyOccurrences[key]) {
          throw new AppError("Variants must have the same properties");
        }
      });
    });
  }
}
