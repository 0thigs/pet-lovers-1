import { beforeEach, describe, expect, it } from 'vitest'

import { ServicesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { UpdateService } from '../../../core/use-cases/services'

let inputMock: InputMock
let outputMock: OutputMock

describe('Update Service Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should update service name', async () => {
    const currentName = 'current name'
    const service = ServicesFaker.fake({ name: 'current name' })
    const services = ServicesFaker.fakeMany(5)
    services.push(service)

    expect(service.name).toBe(currentName)

    const updatedName = 'updated name'
    inputMock.textInputs = [service.id, updatedName]
    inputMock.selectOptions = ['name']

    const useCase = new UpdateService(services, inputMock, outputMock)
    await useCase.update()

    expect(service.name).toBe(updatedName)
  })

  it('should update service description', async () => {
    const currentDescription = 'current description'
    const service = ServicesFaker.fake({ name: 'current description' })
    const services = ServicesFaker.fakeMany(5)
    services.push(service)

    expect(service.name).toBe(currentDescription)

    const updatedDescription = 'updated description'
    inputMock.textInputs = [service.id, updatedDescription]
    inputMock.selectOptions = ['description']

    const useCase = new UpdateService(services, inputMock, outputMock)
    await useCase.update()

    expect(service.description).toBe(updatedDescription)
  })

  it('should update service price', async () => {
    const currentPrice = 100
    const service = ServicesFaker.fake({ price: currentPrice })
    const services = ServicesFaker.fakeMany(5)
    services.push(service)

    expect(service.priceAsNumber).toBe(currentPrice)

    const updatedPrice = 44
    inputMock.textInputs = [service.id]
    inputMock.numberInputs = [updatedPrice]
    inputMock.selectOptions = ['price']

    const useCase = new UpdateService(services, inputMock, outputMock)
    await useCase.update()

    expect(service.priceAsNumber).toBe(updatedPrice)
  })
})
