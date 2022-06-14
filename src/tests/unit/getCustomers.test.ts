import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer";
import { GetCustomersUseCase } from "@app/useCases/GetCustomers";
import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory";

const repositoryFactory = new MemoryRepositoryFactory()
const getCustomers = new GetCustomersUseCase(repositoryFactory)
const createCustomer = new CreateCustomerUseCase(repositoryFactory)

describe('GetCustomers', () => {
  it('Should return an empty array if customer not exists', async () => {
    const customers = await getCustomers.execute({
      sortBy: { name: 'asc' },
      filter: [['name', '~', 'any']],
      page: 1,
      perPage: 10,
    });

    expect(customers).toHaveProperty('rows')
    expect(customers.rows).toBeInstanceOf(Array);
    expect(customers.rows.length).toBe(0);
  })

  it('Should return an array with customers', async () => {
    await createCustomer.execute({
      companyUid: 'company-1',
      data: {
        name: 'Valid Customer',
      }
    })

    const customers = await getCustomers.execute({
      sortBy: { name: 'asc' },
      filter: [['name', '~', 'any']],
      page: 1,
      perPage: 10,
    });

    expect(customers).toHaveProperty('rows')
    expect(customers.rows).toBeInstanceOf(Array);
    expect(customers.rows.length).toBe(1);
  })
})