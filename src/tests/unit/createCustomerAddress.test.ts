import { MemoryRepositoryFactory } from "@app/factories/MemoryRepositoryFactory"
import { CreateCustomerUseCase } from "@app/useCases/CreateCustomer"
import { CreateCustomerAddress } from "@app/useCases/CreateCustomerAddress"

const repositoryFactory = new MemoryRepositoryFactory()
const createCustomer = new CreateCustomerUseCase(repositoryFactory)
const createCustomerAddress = new CreateCustomerAddress(repositoryFactory)

const address = { city: 'Cataguases', neighborhood: 'Bairro', number: '1', state: 'MG', street: 'Rua Amazonas', zipCode: '36773-582', complement: '', }
let customer: any

describe('Create customer address', () => {
  beforeAll(async () => {
    customer = await createCustomer.execute({ data: { name: 'any name' }, companyUid: 'companyUid' })
  })

  test('should be possible to create an address', async () => {
    await expect(createCustomerAddress.execute(address, customer.uid)).resolves.toBeUndefined()
  })

  test('should not be possible to create a address if customer not exists', async () => {
    await expect(createCustomerAddress.execute(address, 'invalid')).rejects.toThrow('Customer not found')
  })

  test('should not be possible to create a invalid address', async () => {
    await expect(createCustomerAddress.execute({ ...address, city: '' }, customer.uid)).rejects.toThrow('City is required')
  })
})