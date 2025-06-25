import { ListCustomers } from '../../../core/use-cases/listing'
import { describe, it, beforeEach, expect } from 'vitest'
import { CustomersFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'

let inputMock: InputMock
let outputMock: OutputMock

describe('List Customers Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should list customers', () => {
    const customers = CustomersFaker.fakeMany(10)

    const useCase = new ListCustomers(customers, inputMock, outputMock)
    useCase.list()

    const customersTable = outputMock.tables[0]

    expect(customersTable).toEqual(
      customers.map((customer) => ({
        ID: customer.id,
        Nome: customer.name,
        CPF: customer.cpf.value,
        Gênero: customer.gender,
        Telefones: customer.phones.map((phone) => phone.number).join(', '),
        'Nome social': customer.socialName,
        "RG's": customer.rgs.map((rg) => rg.value).join(', '),
        'Consumo em quantidade': customer.consumedProductsOrServicesCount,
        'Consumo em R$': customer.spending,
      })),
    )
  })

  it('should not list customers if there is no customer', () => {
    const useCase = new ListCustomers([], inputMock, outputMock)

    useCase.list()

    expect(outputMock.lastErrorMessage).toBe('Nenhum cliente encontrado')
  })
})
