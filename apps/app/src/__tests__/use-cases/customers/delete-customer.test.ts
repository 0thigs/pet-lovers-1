import { beforeEach, describe, expect, it } from 'vitest'

import { CustomersFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { DeleteCustomer } from '../../../core/use-cases/customers'

let inputMock: InputMock
let outputMock: OutputMock

describe('Delete Customer Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should delete customer', async () => {
    const customer = CustomersFaker.fake()
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    expect(customers).toHaveLength(6)

    inputMock.textInputs = [customer.id]
    const useCase = new DeleteCustomer(customers, inputMock, outputMock)
    await useCase.delete()

    expect(customers).toHaveLength(5)
  })
})
