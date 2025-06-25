import {} from '../../../core/use-cases/listing'
import { describe, it, beforeEach, expect } from 'vitest'
import { CustomersFaker, ProductsFaker, ServicesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { ListProductsAndServicesByMostComsumptionAndCustomerGenderUseCase } from '../../../core/use-cases/listing/list-products-and-services-by-most-comsumption-and-pet-type'

let inputMock: InputMock
let outputMock: OutputMock

describe('List Customers By Most Products Or Services Consumption And Gender Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  function fakeCustomersFixture(gender: 'masculino' | 'feminino') {
    const customerA = CustomersFaker.fake({
      name: 'customer A',
      gender,
      consumedProducts: ProductsFaker.fakeMany(2),
      consumedServices: ServicesFaker.fakeMany(2),
    })
    const customerB = CustomersFaker.fake({
      name: 'customer B',
      gender,
      consumedProducts: ProductsFaker.fakeMany(3),
      consumedServices: ServicesFaker.fakeMany(3),
    })
    const customerC = CustomersFaker.fake({
      name: 'customer C',
      gender,
      consumedProducts: ProductsFaker.fakeMany(1),
      consumedServices: ServicesFaker.fakeMany(1),
    })

    return [customerA, customerB, customerC]
  }

  it('should list male customers by products consumption in an ascending order', () => {
    const [maleCustomerA, maleCustomerB, maleCustomerC] =
      fakeCustomersFixture('masculino')
    const [femaleCustomerA, femaleCustomerB, femaleCustomerC] =
      fakeCustomersFixture('feminino')

    const useCase = new ListProductsAndServicesByMostComsumptionAndCustomerGenderUseCase(
      [
        femaleCustomerC,
        maleCustomerC,
        femaleCustomerA,
        femaleCustomerB,
        maleCustomerA,
        maleCustomerB,
      ],
      inputMock,
      outputMock,
    )
    useCase.list()

    const customersTable = outputMock.tables[0]
    const correctCustomersList = [maleCustomerB, maleCustomerA, maleCustomerC]

    expect(customersTable).toEqual(
      correctCustomersList.map((customer) => ({
        ID: customer.id,
        Nome: customer.name,
        CPF: customer.cpf.value,
        Gênero: 'masculino',
        Telefones: customer.phones.map((phone) => phone.number).join(', '),
        'Nome social': customer.socialName,
        "RG's": customer.rgs.map((rg) => rg.value).join(', '),
        'Consumo em quantidade': customer.consumedProductsOrServicesCount,
        'Consumo em R$': customer.spending,
      })),
    )
  })

  it('should list female customers by products consumption in an ascending order', () => {
    const [maleCustomerA, maleCustomerB, maleCustomerC] =
      fakeCustomersFixture('masculino')
    const [femaleCustomerA, femaleCustomerB, femaleCustomerC] =
      fakeCustomersFixture('feminino')

    const useCase = new ListProductsAndServicesByMostComsumptionAndCustomerGenderUseCase(
      [
        femaleCustomerC,
        maleCustomerC,
        femaleCustomerA,
        femaleCustomerB,
        maleCustomerA,
        maleCustomerB,
      ],
      inputMock,
      outputMock,
    )
    useCase.list()

    const customersTable = outputMock.tables[1]
    const correctCustomersList = [femaleCustomerB, femaleCustomerA, femaleCustomerC]

    expect(customersTable).toEqual(
      correctCustomersList.map((customer) => ({
        ID: customer.id,
        Nome: customer.name,
        CPF: customer.cpf.value,
        Gênero: 'feminino',
        Telefones: customer.phones.map((phone) => phone.number).join(', '),
        'Nome social': customer.socialName,
        "RG's": customer.rgs.map((rg) => rg.value).join(', '),
        'Consumo em quantidade': customer.consumedProductsOrServicesCount,
        'Consumo em R$': customer.spending,
      })),
    )
  })
})
