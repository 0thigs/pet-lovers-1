import { beforeEach, describe, expect, it } from 'vitest'

import { ServicesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'
import { DeleteService } from '../../../core/use-cases/services'

let inputMock: InputMock
let outputMock: OutputMock

describe('Delete Service Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should delete service', async () => {
    const service = ServicesFaker.fake()
    const services = ServicesFaker.fakeMany(5)
    services.push(service)

    expect(services).toHaveLength(6)

    inputMock.textInputs = [service.id]
    const useCase = new DeleteService(services, inputMock, outputMock)
    await useCase.delete()

    expect(services).toHaveLength(5)
  })
})
