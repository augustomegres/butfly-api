import { CreateProductUseCase } from "@app/useCases/CreateProduct";
import { MemoryRepositoryFactory } from "@factories/repositories/MemoryRepositoryFactory";

const factory = new MemoryRepositoryFactory();
const createProductUseCase = new CreateProductUseCase(factory);

const validProduct = {
  companyUid: "company-uid",
  name: "Produto",
  description: "test",
};
const validVariant = {
  images: ["https://via.placeholder.com/300.png/09f/fff"],
  properties: [
    { key: "Peso", value: "12Kg" },
    { key: "Dimensões", value: "L12xM2xA4" },
  ],
  price: 1200,
  quantity: 0,
};
describe("CreateProduct", () => {
  it("should be possible to create a product", async () => {
    const product = await createProductUseCase.execute({
      ...validProduct,
      variants: [validVariant],
    });

    expect(product.name).toBe("Produto");
  });

  it("should not be possible to create a product if variant properties are inconsistent", async () => {
    await expect(
      createProductUseCase.execute({
        ...validProduct,
        variants: [
          validVariant,
          {
            images: ["https://via.placeholder.com/300.png/09f/fff"],
            properties: [{ key: "Dimensões", value: "L12xM2xA4" }],
            price: 100,
            quantity: 0,
          },
        ],
      })
    ).rejects.toThrow("Variants must have the same properties");
  });

  it("should not be possible to create a product without a name", async () => {
    await expect(
      createProductUseCase.execute({
        ...validProduct,
        variants: [validVariant],
        name: "",
      })
    ).rejects.toThrow("Name must be at least 3 characters");
  });

  it("should not be possible to create a name with special characters", async () => {
    await expect(
      createProductUseCase.execute({
        ...validProduct,
        variants: [validVariant],
        name: "@$%DR@$",
      })
    ).rejects.toThrow("Name must only contain letters and numbers");
  });

  it("should not be possible to create a product with name with morte than 50 characters", async () => {
    await expect(
      createProductUseCase.execute({
        ...validProduct,
        variants: [validVariant],
        name: "A".repeat(51),
      })
    ).rejects.toThrow("Name must be at most 50 characters");
  });

  it("should not be possible to create a product with invalid price", async () => {
    await expect(
      createProductUseCase.execute({
        ...validProduct,
        variants: [{ ...validVariant, price: "invalid" as any }],
      })
    ).rejects.toThrow("You must provide a valid product price");
  });

  it("should not be possible to create a product with negative price", async () => {
    await expect(
      createProductUseCase.execute({
        ...validProduct,
        variants: [{ ...validVariant, price: -500 }],
      })
    ).rejects.toThrow("Price must be greater than 0");
  });

  it("should not be possible to create a product with invalid name", async () => {});
});
