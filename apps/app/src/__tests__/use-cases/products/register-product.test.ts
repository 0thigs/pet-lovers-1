import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { RegisterProduct } from '../../../core/use-cases/products'

let inputMock: InputMock
let outputMock: OutputMock

describe('Register Product Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should register product', async () => {
    const newProduct = ProductsFaker.fake()
    const products = ProductsFaker.fakeMany(5)

    inputMock.textInputs = [newProduct.name, newProduct.description]
    inputMock.numberInputs = [newProduct.priceAsNumber]

    const useCase = new RegisterProduct(products, inputMock, outputMock)

    await useCase.register()
    expect(products).toHaveLength(6)
  })
})
