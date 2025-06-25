import { ListServices } from '../../../core/use-cases/listing'
import { describe, it, beforeEach, expect } from 'vitest'
import { ServicesFaker } from '../../fakers'
import { InputMock, OutputMock } from '../../mocks'

let inputMock: InputMock
let outputMock: OutputMock

describe('List Services Use Case', () => {
  beforeEach(() => {
    inputMock = new InputMock()
    outputMock = new OutputMock()
  })

  it('should list Services', () => {
    const services = ServicesFaker.fakeMany(10)

    const useCase = new ListServices(services, inputMock, outputMock)
    useCase.list()

    const servicesTable = outputMock.tables[0]

    expect(servicesTable).toEqual(
      services.map((product) => ({
        ID: product.id,
        Nome: product.name,
        Preco: product.price,
        Descrição: product.description,
      })),
    )
  })

  it('should not list Services if there is no customer', () => {
    const useCase = new ListServices([], inputMock, outputMock)

    useCase.list()

    expect(outputMock.lastErrorMessage).toBe('Nenhum serviço encontrado')
  })
})
