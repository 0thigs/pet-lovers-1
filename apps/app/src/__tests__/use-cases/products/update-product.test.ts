import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { UpdateProduct } from '../../../core/use-cases/products'

let inputMock: InputMock
let outputMock: OutputMock

describe('Update Product Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should update product name', async () => {
    const currentName = 'current name'
    const product = ProductsFaker.fake({ name: 'current name' })
    const products = ProductsFaker.fakeMany(5)
    products.push(product)

    expect(product.name).toBe(currentName)

    const updatedName = 'updated name'
    inputMock.textInputs = [product.id, updatedName]
    inputMock.selectOptions = ['name']

    const useCase = new UpdateProduct(products, inputMock, outputMock)
    await useCase.update()

    expect(product.name).toBe(updatedName)
  })

  it('should update product description', async () => {
    const currentDescription = 'current description'
    const product = ProductsFaker.fake({ name: 'current description' })
    const products = ProductsFaker.fakeMany(5)
    products.push(product)

    expect(product.name).toBe(currentDescription)

    const updatedDescription = 'updated description'
    inputMock.textInputs = [product.id, updatedDescription]
    inputMock.selectOptions = ['description']

    const useCase = new UpdateProduct(products, inputMock, outputMock)
    await useCase.update()

    expect(product.description).toBe(updatedDescription)
  })

  it('should update product price', async () => {
    const currentPrice = 100
    const product = ProductsFaker.fake({ price: currentPrice })
    const products = ProductsFaker.fakeMany(5)
    products.push(product)

    expect(product.priceAsNumber).toBe(currentPrice)

    const updatedPrice = 44
    inputMock.textInputs = [product.id]
    inputMock.numberInputs = [updatedPrice]
    inputMock.selectOptions = ['price']

    const useCase = new UpdateProduct(products, inputMock, outputMock)
    await useCase.update()

    expect(product.priceAsNumber).toBe(updatedPrice)
  })
})
