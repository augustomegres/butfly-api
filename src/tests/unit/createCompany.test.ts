import { Address } from "@entities/Address";
import { CreateCompanyUseCase } from "@src/app/useCases/CreateCompany";
import { MemoryRepositoryFactory } from "@src/factories/repositories/MemoryRepositoryFactory";

const repositoryFactory = new MemoryRepositoryFactory();
const createCompanyUseCase = new CreateCompanyUseCase(repositoryFactory);

const data = {
  name: "Company",
};

const address = {
  city: "Any city",
  neighborhood: "Any neighborhood",
  number: "122",
  state: "MG",
  street: "Any street",
  zipCode: "36773-000",
  complement: "Any complement",
};

describe("CreateCompany", () => {
  it("should be possible to create a new company", async () => {
    await expect(createCompanyUseCase.execute(data, 1)).resolves.toHaveProperty(
      "uid"
    );
  });

  it("should store address in new company request", async () => {
    const company = await createCompanyUseCase.execute(
      { ...data, addresses: [address] },
      1
    );
    expect(company.addresses).toHaveLength(1);
    expect(company.addresses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uid: expect.any(String),
        }),
      ])
    );
  });

  it("should throw an error if address neighborhood was not provided", async () => {
    const company = createCompanyUseCase.execute(
      {
        ...data,
        addresses: [
          {
            city: "Any city",
            neighborhood: "",
            number: "122",
            state: "MG",
            street: "Any street",
            zipCode: "36773-000",
          },
        ],
      },
      1
    );
    await expect(company).rejects.toThrow("Neighborhood is required");
  });

  it("should throw an error if address city was not provided", async () => {
    const company = createCompanyUseCase.execute(
      {
        ...data,
        addresses: [
          {
            city: "",
            neighborhood: "Any neighborhood",
            number: "122",
            state: "MG",
            street: "Any street",
            zipCode: "36773-000",
          },
        ],
      },
      1
    );
    await expect(company).rejects.toThrow("City is required");
  });

  it("should throw an error if address number was not provided", async () => {
    const company = createCompanyUseCase.execute(
      {
        ...data,
        addresses: [
          {
            city: "Any city",
            neighborhood: "Any neighborhood",
            number: "",
            state: "MG",
            street: "Any street",
            zipCode: "36773-000",
          },
        ],
      },
      1
    );
    await expect(company).rejects.toThrow("Number is required");
  });
  it("should throw an error if address state was not provided", async () => {
    const company = createCompanyUseCase.execute(
      {
        ...data,
        addresses: [
          {
            city: "Any city",
            neighborhood: "Any neighborhood",
            number: "12",
            state: "",
            street: "Any street",
            zipCode: "36773-000",
          },
        ],
      },
      1
    );
    await expect(company).rejects.toThrow("State is required");
  });
  it("should throw an error if address street was not provided", async () => {
    const company = createCompanyUseCase.execute(
      {
        ...data,
        addresses: [
          {
            city: "Any city",
            neighborhood: "Any neighborhood",
            number: "12",
            state: "MG",
            street: "",
            zipCode: "36773-000",
          },
        ],
      },
      1
    );
    await expect(company).rejects.toThrow("Street is required");
  });
  it("should throw an error if address zipCode was not provided", async () => {
    const company = createCompanyUseCase.execute(
      {
        ...data,
        addresses: [
          {
            city: "Any city",
            neighborhood: "Any neighborhood",
            number: "12",
            state: "MG",
            street: "Any street",
            zipCode: "",
          },
        ],
      },
      1
    );
    await expect(company).rejects.toThrow("ZipCode is required");
  });
  it("should store phones in new company request", async () => {
    const company = await createCompanyUseCase.execute(
      {
        ...data,
        phones: ["31999999999"],
      },
      1
    );
    expect(company.phones).toHaveLength(1);
    expect(company.phones).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uid: expect.any(String),
        }),
      ])
    );
  });

  it("should store emails in new company request", async () => {
    const company = await createCompanyUseCase.execute(
      {
        ...data,
        emails: ["any@mail.com"],
      },
      1
    );
    expect(company.emails).toHaveLength(1);
    expect(company.emails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uid: expect.any(String),
        }),
      ])
    );
  });

  it("should store cnpj in new company request", async () => {
    const company = await createCompanyUseCase.execute(
      {
        ...data,
        cnpj: "70614365000191",
      },
      1
    );
    expect(company.cnpj).toEqual("70614365000191");
  });

  it("should not be possible to create a company with invalid phone", async () => {
    await expect(
      createCompanyUseCase.execute(
        {
          ...data,
          phones: ["AB999999999"],
        },
        1
      )
    ).rejects.toThrow();
  });

  it("should not be possible to create a company with invalid email", async () => {
    await expect(
      createCompanyUseCase.execute(
        {
          ...data,
          emails: ["anymail.com"],
        },
        1
      )
    ).rejects.toThrow();
  });

  it("should not be possible to create a company with invalid cnpj", async () => {
    await expect(
      createCompanyUseCase.execute(
        {
          ...data,
          cnpj: "invalid",
        },
        1
      )
    ).rejects.toThrow();
  });

  it("should not be possible to create a new company with an invalid name", async () => {
    await expect(
      createCompanyUseCase.execute({ ...data, name: "" }, 1)
    ).rejects.toThrow("Company name is required");

    await expect(
      createCompanyUseCase.execute({ ...data, name: "a" }, 1)
    ).rejects.toThrow("Company name must be valid");
  });

  it("should not be possible to create a company with invalid zipCode", async () => {
    await expect(
      createCompanyUseCase.execute(
        {
          ...data,
          addresses: [{ ...address, zipCode: "invalid" }],
        },
        1
      )
    ).rejects.toThrow("ZipCode is invalid.");
  });
});
