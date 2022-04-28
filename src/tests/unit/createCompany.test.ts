import { CreateCompanyUseCase } from "@src/app/useCases/CreateCompany";
import { MemoryRepositoryFactory } from "@src/factories/repositories/MemoryRepositoryFactory";

const repositoryFactory = new MemoryRepositoryFactory();
const createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);

const data = {
  name: "Company",
};

describe("CreateCompany", () => {
  it("should be possible to create a new company", async () => {
    await expect(createCompanyUseCase.execute(data)).resolves.toHaveProperty(
      "uid"
    );
  });

  it("should store address in new company request", async () => {
    const company = await createCompanyUseCase.execute({
      ...data,
      addresses: [
        {
          city: "Any city",
          neighborhood: "Any neighborhood",
          number: "122",
          state: "MG",
          street: "Any street",
          zipCode: "36773-000",
          complement: "Any complement",
        },
      ],
    });
    expect(company.addresses).toHaveLength(1);
    expect(company.addresses[0]).toHaveProperty("uid");
  });

  it("should store phones in new company request", async () => {
    const company = await createCompanyUseCase.execute({
      ...data,
      phones: ["31999999999"],
    });
    expect(company.phones).toHaveLength(1);
    expect(company.phones[0]).toHaveProperty("uid");
  });

  it("should store emails in new company request", async () => {
    const company = await createCompanyUseCase.execute({
      ...data,
      emails: ["any@mail.com"],
    });
    expect(company.emails).toHaveLength(1);
    expect(company.emails[0]).toHaveProperty("uid");
  });

  it("should store cnpj in new company request", async () => {
    const company = await createCompanyUseCase.execute({
      ...data,
      cnpj: "70614365000191",
    });
    expect(company.cnpj).toEqual("70614365000191");
  });

  it("should not be possible to create a company with invalid phone", async () => {
    await expect(
      createCompanyUseCase.execute({
        ...data,
        phones: ["AB999999999"],
      })
    ).rejects.toThrow();
  });

  it("should not be possible to create a company with invalid email", async () => {
    await expect(
      createCompanyUseCase.execute({
        ...data,
        emails: ["anymail.com"],
      })
    ).rejects.toThrow();
  });

  it("should not be possible to create a new company with an invalid name", async () => {
    await expect(
      createCompanyUseCase.execute({ ...data, name: "" })
    ).rejects.toThrow("Company name is required");

    await expect(
      createCompanyUseCase.execute({ ...data, name: "a" })
    ).rejects.toThrow("Company name must be valid");
  });
});
