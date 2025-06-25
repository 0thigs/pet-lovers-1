import { ListProducts } from '../../../core/use-cases/listing'
import { describe, it, beforeEach, expect } from 'vitest'
import { ProductsFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'

let inputMock: InputMock
let outputMock: OutputMock

describe('List Products Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should list products', () => {
    const products = ProductsFaker.fakeMany(10)

    const useCase = new ListProducts(products, inputMock, outputMock)
    useCase.list()

    const productsTable = outputMock.tables[0]

    expect(productsTable).toEqual(
      products.map((product) => ({
        ID: product.id,
        Nome: product.name,
        Preco: product.price,
        Descrição: product.description,
      })),
    )
  })

  it('should not list products if there is no customer', () => {
    const useCase = new ListProducts([], inputMock, outputMock)

    useCase.list()

    expect(outputMock.lastErrorMessage).toBe('Nenhum produto encontrado')
  })
})
