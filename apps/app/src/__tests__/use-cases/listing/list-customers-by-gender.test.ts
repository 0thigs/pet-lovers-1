import { ListCustomersByGender } from '../../../core/use-cases/listing'
import { describe, it, beforeEach, expect } from 'vitest'
import { CustomersFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'

let inputMock: InputMock
let outputMock: OutputMock

describe('List Customer By Gender Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should list male customers first and then female customers', () => {
    const customers = [
      ...CustomersFaker.fakeMany(5, { gender: 'feminino' }),
      ...CustomersFaker.fakeMany(10, { gender: 'masculino' }),
    ]

    const useCase = new ListCustomersByGender(customers, inputMock, outputMock)
    useCase.list()

    const maleCustomersTable = outputMock.tables[0]
    const femaleCustomersTable = outputMock.tables[1]

    expect(maleCustomersTable).toHaveLength(10)
    expect(femaleCustomersTable).toHaveLength(5)
  })
})
