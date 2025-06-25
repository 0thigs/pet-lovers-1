import { beforeEach, describe, expect, it } from 'vitest'

import { ServicesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { RegisterService } from '../../../core/use-cases/services'

let inputMock: InputMock
let outputMock: OutputMock

describe('Register Service Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should register service', async () => {
    const newService = ServicesFaker.fake()
    const services = ServicesFaker.fakeMany(5)

    expect(services).toHaveLength(5)

    inputMock.textInputs = [newService.name, newService.description]
    inputMock.numberInputs = [newService.priceAsNumber]

    const useCase = new RegisterService(services, inputMock, outputMock)

    await useCase.register()
    expect(services).toHaveLength(6)
  })
})
