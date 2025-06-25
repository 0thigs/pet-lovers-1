import { ListProductsAndServicesByMostConsumption } from '../../../core/use-cases/listing'
import { describe, it, beforeEach, expect } from 'vitest'
import { CustomersFaker, ProductsFaker, ServicesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'

let inputMock: InputMock
let outputMock: OutputMock

describe('List Products And Services By Most Consumption Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should list products by most consumption in an ascending order', () => {
    const productA = ProductsFaker.fake({ id: 'product A' })
    const productB = ProductsFaker.fake({ id: 'product B' })
    const productC = ProductsFaker.fake({ id: 'product C' })

    const customers = [
      CustomersFaker.fake({
        consumedProducts: [productC],
      }),
      CustomersFaker.fake({
        consumedProducts: [productA, productA, productB],
      }),
      CustomersFaker.fake({
        consumedProducts: [productB, productA],
      }),
    ]

    const useCase = new ListProductsAndServicesByMostConsumption(
      [],
      [],
      inputMock,
      outputMock,
    )
    useCase.list()

    const productsTable = outputMock.tables[0]
    const correctproductsList = [productA, productB, productC]

    expect(productsTable).toEqual(
      correctproductsList.map((customer) => ({
        ID: customer.id,
        Nome: customer.name,
        Preco: customer.price,
        Descrição: customer.description,
      })),
    )
  })

  it('should list services by most consumption in an ascending order', () => {
    const serviceA = ServicesFaker.fake({ id: 'Service A', ordersCount: 10 })
    const serviceB = ServicesFaker.fake({ id: 'Service B', ordersCount: 5 })
    const serviceC = ServicesFaker.fake({ id: 'Service C', ordersCount: 0 })

    const useCase = new ListProductsAndServicesByMostConsumption(
      [],
      [serviceC, serviceB, serviceA],
      inputMock,
      outputMock,
    )
    useCase.list()

    const servicesTable = outputMock.tables[1]
    const correctServicesList = [serviceA, serviceB, serviceC]

    expect(servicesTable).toEqual(
      correctServicesList.map((customer) => ({
        ID: customer.id,
        Nome: customer.name,
        Preco: customer.price,
        Descrição: customer.description,
      })),
    )
  })
})
