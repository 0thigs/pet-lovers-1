import { beforeEach, describe, expect, it } from 'vitest'

import { CustomersFaker, PhonesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { RegisterCustomer, UpdateCustomer } from '../../../core/use-cases/customers'
import { RgsFaker } from '../../fakers/rgs-faker'

let inputMock: InputMock
let outputMock: OutputMock

describe('Update Customer Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should update customer name', async () => {
    const customer = CustomersFaker.fake()
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedName = 'updated name'
    inputMock.textInputs = [customer.id, updatedName]
    inputMock.selectOptions = ['name']
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.name).toBe(updatedName)
  })

  it('should update customer social name', async () => {
    const customer = CustomersFaker.fake()
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedSocialName = 'updated social name'
    inputMock.textInputs = [customer.id, updatedSocialName]
    inputMock.selectOptions = ['socialName']
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.socialName).toBe(updatedSocialName)
  })

  it('should update customer social name', async () => {
    const customer = CustomersFaker.fake()
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedGender = 'updated gender'
    inputMock.textInputs = [customer.id]
    inputMock.selectOptions = ['gender', updatedGender]
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.gender).toBe(updatedGender)
  })

  it('should update second customer rg value', async () => {
    const rg = RgsFaker.fake()
    const customer = CustomersFaker.fake({ rgs: [RgsFaker.fake(), rg, RgsFaker.fake()] })
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedRgValue = 'updated rg value'
    inputMock.textInputs = [customer.id, updatedRgValue]
    inputMock.selectOptions = ['rgs', '2', 'value']
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.rgs[1].value).toBe(updatedRgValue)
  })

  it('should update second customer rg issue date', async () => {
    const rg = RgsFaker.fake()
    const customer = CustomersFaker.fake({ rgs: [RgsFaker.fake(), rg, RgsFaker.fake()] })
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedRgIssueDate = '12/06/2024'
    inputMock.textInputs = [customer.id, updatedRgIssueDate]
    inputMock.selectOptions = ['rgs', '2', 'issueDate']
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.rgs[1].issueDate).toBe(updatedRgIssueDate)
  })

  it('should update customer cpf value', async () => {
    const customer = CustomersFaker.fake()
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedCpfValue = 'updated cpf value'
    inputMock.textInputs = [customer.id, updatedCpfValue]
    inputMock.selectOptions = ['cpf', 'value']
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.cpf.value).toBe(updatedCpfValue)
  })

  it('should update customer cpf issue date', async () => {
    const customer = CustomersFaker.fake()
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedCpfIssueDate = '12/06/2024'
    inputMock.textInputs = [customer.id, updatedCpfIssueDate]
    inputMock.selectOptions = ['cpf', 'issueDate']
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.cpf.issueDate).toBe(updatedCpfIssueDate)
  })

  it('should update second customer phone value', async () => {
    const phone = PhonesFaker.fake()
    const customer = CustomersFaker.fake({
      phones: [PhonesFaker.fake(), phone, PhonesFaker.fake()],
    })
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedPhoneNumber = 'updated phone number'
    inputMock.textInputs = [customer.id, updatedPhoneNumber]
    inputMock.selectOptions = ['phones', '2', 'number']
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.phones[1].number).toBe(updatedPhoneNumber)
  })

  it('should update second customer phone code area', async () => {
    const phone = PhonesFaker.fake()
    const customer = CustomersFaker.fake({
      phones: [PhonesFaker.fake(), phone, PhonesFaker.fake()],
    })
    const customers = CustomersFaker.fakeMany(5)
    customers.push(customer)

    const updatedPhoneCodeArea = 'updated phone code area'
    inputMock.textInputs = [customer.id, updatedPhoneCodeArea]
    inputMock.selectOptions = ['phones', '2', 'codeArea']
    const useCase = new UpdateCustomer(customers, inputMock, outputMock)
    await useCase.update()

    expect(customer.phones[1].codeArea).toBe(updatedPhoneCodeArea)
  })
})
