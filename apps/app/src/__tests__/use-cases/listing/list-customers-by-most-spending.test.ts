import { ListCustomersByMostSpeding } from '../../../core/use-cases/listing'
import { describe, it, beforeEach, expect } from 'vitest'
import { CustomersFaker, ProductsFaker, ServicesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'

let inputMock: InputMock
let outputMock: OutputMock

describe('List Customers By Most Spending Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should list customers by spending in an ascending order', () => {
    const customerA = CustomersFaker.fake({
      name: 'A',
      consumedProducts: ProductsFaker.fakeMany(3, { price: 10 }),
      consumedServices: ServicesFaker.fakeMany(3, { price: 10 }),
    })
    const customerB = CustomersFaker.fake({
      name: 'B',
      consumedProducts: ProductsFaker.fakeMany(2, { price: 100 }),
      consumedServices: ServicesFaker.fakeMany(2, { price: 100 }),
    })
    const customerC = CustomersFaker.fake({
      name: 'C',
      consumedProducts: ProductsFaker.fakeMany(1, { price: 100 }),
      consumedServices: ServicesFaker.fakeMany(1, { price: 100 }),
    })
    const customerE = CustomersFaker.fake({
      name: 'E',
      consumedProducts: ProductsFaker.fakeMany(1, { price: 1 }),
      consumedServices: ServicesFaker.fakeMany(1, { price: 1 }),
    })
    const customerF = CustomersFaker.fake({
      name: 'F',
      consumedProducts: ProductsFaker.fakeMany(1, { price: 1 }),
      consumedServices: ServicesFaker.fakeMany(1, { price: 1 }),
    })
    const customerG = CustomersFaker.fake({
      name: 'F',
      consumedProducts: ProductsFaker.fakeMany(1, { price: 1 }),
      consumedServices: ServicesFaker.fakeMany(1, { price: 1 }),
    })

    const customers = [customerA, customerB, customerC, customerE, customerF, customerG]

    const useCase = new ListCustomersByMostSpeding(customers, inputMock, outputMock)
    useCase.list()

    const customersTable = outputMock.tables[0]

    const correctCustomersList = [customerB, customerC, customerA, customerE, customerF]

    console.log(customersTable)

    expect(customersTable).toHaveLength(5)
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
