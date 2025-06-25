import type { Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Delete } from '../delete'
import { ListServices } from '../listing'

export class DeleteService extends Delete {
  private isRunning = true
  private services: Service[]

  constructor(services: Service[], input: Input, output: Output) {
    super(input, output)
    this.services = services
  }

  public async delete(): Promise<void> {
    this.output.clear()
    const servicesList = new ListServices(this.services, this.input, this.output)
    servicesList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do Serviço:')

      const service = this.services.find((service) => service.id === id)

      if (!service) {
        this.output.error('Serviço não encontrado')
        continue
      }

      await this.deleteService(service)
      this.isRunning = false
    }
  }

  public async deleteService(service: Service): Promise<void> {
    const serviceIndex = this.services.findIndex((currentService) =>
      currentService.isEqualTo(service),
    )
    this.services.splice(serviceIndex, 1)

    this.output.clear()

    new ListServices(this.services, this.input, this.output).list()

    this.output.success('Serviço deletado com sucesso')
  }
}
