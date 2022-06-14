import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory";
import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer";
import { CreateCustomerEmailUseCase } from "@app/useCases/CreateCustomerEmail";

let repositoryFactory: MemoryRepositoryFactory
let createCustomerEmail: CreateCustomerEmailUseCase;
let createCustomer: CreateCustomerUseCase;

describe('Create customer email', () => {
  beforeEach(() => {
    repositoryFactory = new MemoryRepositoryFactory();
    createCustomerEmail = new CreateCustomerEmailUseCase(repositoryFactory);
    createCustomer = new CreateCustomerUseCase(repositoryFactory);
  })

  test('should be possible do create a new customer email', async () => {
    const newCustomer = await createCustomer.execute({ companyUid: 'uid', data: { name: 'Customer name', emails: [] } })
    await expect(createCustomerEmail.execute('valid@mail.com', newCustomer.uid)).resolves.toBeUndefined();
    const customer = await repositoryFactory.memoryRepository.customers.find(customer => customer.uid === newCustomer.uid);
    expect(customer?.emails.length).toBe(1);
    expect(customer?.emails[0].email).toBe('valid@mail.com')
  })

  test('should not be possible to create a new customer email if email is invalid', async () => {
    const newCustomer = await createCustomer.execute({ companyUid: 'uid', data: { name: 'Customer name', emails: [] } })
    await expect(createCustomerEmail.execute('invalid', newCustomer.uid)).rejects.toThrow('Email is invalid.')
  })

  test('should not be possible to create a new customer email if email is already used by this user', async () => {
    const newCustomer = await createCustomer.execute({ companyUid: 'uid', data: { name: 'Customer name', emails: [] } })
    await createCustomer.execute({ companyUid: 'uid', data: { name: 'New Customer', emails: ['valid@mail.com'] } })
    await expect(createCustomerEmail.execute('valid@mail.com', newCustomer.uid)).rejects.toThrow('Email already registered')
  })
})