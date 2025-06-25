import { ListCustomersByMostConsumption } from '../../../core/use-cases/listing'
import { describe, it, beforeEach, expect } from 'vitest'
import { CustomersFaker, ProductsFaker, ServicesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'

let inputMock: InputMock
let outputMock: OutputMock

describe('List Customers By Most Products Or Services Consumption Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should list customers by products consumption in an ascending order', () => {
    const customerB = CustomersFaker.fake({
      name: 'B',
      consumedProducts: ProductsFaker.fakeMany(2),
      consumedServices: ServicesFaker.fakeMany(2),
    })
    const customerA = CustomersFaker.fake({
      name: 'A',
      consumedProducts: ProductsFaker.fakeMany(3),
      consumedServices: ServicesFaker.fakeMany(3),
    })
    const customerC = CustomersFaker.fake({
      name: 'C',
      consumedProducts: ProductsFaker.fakeMany(1),
      consumedServices: ServicesFaker.fakeMany(1),
    })

    const customers = [customerB, customerC, customerA]

    const useCase = new ListCustomersByMostConsumption(customers, inputMock, outputMock)
    useCase.list()

    const customersTable = outputMock.tables[0]

    const correctCustomersList = [customerA, customerB, customerC]

    expect(customersTable).toEqual(
      correctCustomersList.map((customer) => ({
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
})
