import { beforeEach, describe, expect, it } from 'vitest'

import { CustomersFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { RegisterCustomer } from '../../../core/use-cases/customers'

let inputMock: InputMock
let outputMock: OutputMock

describe('Register Customer Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should register customer', async () => {
    const customers = CustomersFaker.fakeMany(5)
    const newCustomer = CustomersFaker.fake()

    expect(customers).toHaveLength(5)

    const rgInputs = newCustomer.rgs.reduce((rgValues: string[], rg) => {
      rgValues.push(rg.value)
      rgValues.push(rg.issueDate)
      return rgValues
    }, [])

    const phoneInputs = newCustomer.phones.reduce((phoneValues: string[], phone) => {
      phoneValues.push(phone.number)
      phoneValues.push(phone.codeArea)
      return phoneValues
    }, [])

    inputMock.textInputs = [
      newCustomer.name,
      newCustomer.socialName,
      newCustomer.cpf.value,
      newCustomer.cpf.issueDate,
      ...rgInputs,
      ...phoneInputs,
    ]
    inputMock.selectOptions = [newCustomer.gender]
    inputMock.numberInputs = [newCustomer.rgs.length, newCustomer.phones.length]

    const useCase = new RegisterCustomer(customers, inputMock, outputMock)
    await useCase.register()

    expect(customers).toHaveLength(6)
  })
})
