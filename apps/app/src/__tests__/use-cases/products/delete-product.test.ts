import { beforeEach, describe, expect, it } from 'vitest'

import { ProductsFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { DeleteProduct } from '../../../core/use-cases/products'

let inputMock: InputMock
let outputMock: OutputMock

describe('Delete Product Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should delete product', async () => {
    const product = ProductsFaker.fake()
    const products = ProductsFaker.fakeMany(5)
    products.push(product)

    expect(products).toHaveLength(6)

    inputMock.textInputs = [product.id]
    const useCase = new DeleteProduct(products, inputMock, outputMock)
    await useCase.delete()

    expect(products).toHaveLength(5)
  })
})
