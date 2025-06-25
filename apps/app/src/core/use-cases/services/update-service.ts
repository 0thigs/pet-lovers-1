import type { Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Update } from '../update'
import { ListServices } from '../listing'
import { Validator } from '@/core/utils'

export class UpdateService extends Update {
  private isRunning = true
  private services: Service[]

  constructor(services: Service[], input: Input, output: Output) {
    super(input, output)
    this.services = services
  }

  public async update(): Promise<void> {
    this.output.clear()
    const servicesList = new ListServices(this.services, this.input, this.output)
    servicesList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do serviço:')

      const service = this.services.find((service) => service.id === id)

      if (!service) {
        this.output.error('Serviço não encontrado')
        continue
      }

      await this.updateService(service)
      this.isRunning = false
    }
  }

  private async updateService(service: Service): Promise<void> {
    const option = await this.input.select('Escolha uma opção para atualizar:', [
      ['Nome', 'name'],
      ['Descrição', 'description'],
      ['Preço', 'price'],
      ['voltar', 'back'],
    ])

    const validator = new Validator(this.output)

    switch (option) {
      case 'name':
        {
          let name = ''
          while (true) {
            name = await this.input.text('Novo nome do serviço:')
            if (!validator.validateText(name)) {
              this.output.error('Nome é obrigatório')
              continue
            }
            break
          }
          service.name = name
        }
        break
      case 'description':
        {
          let description = ''
          while (true) {
            description = await this.input.text('Nova descrição do serviço:')
            if (!validator.validateText(description)) {
              this.output.error('Descrição é obrigatória')
              continue
            }
            break
          }
          service.description = description
        }
        break
      case 'price':
        {
          let price = ''
          while (true) {
            price = await this.input.text('Novo preço do serviço:')
            if (!validator.validateNumber(price)) {
              continue
            }
            break
          }

          service.price = Number(price)
        }
        break
      case 'back':
        return
      default:
        this.output.error('Opção inválida')
    }

    const serviceIndex = this.services.findIndex((currentService) =>
      currentService.isEqualTo(service),
    )
    this.services.splice(serviceIndex, 1, service)

    this.output.clear()

    new ListServices(this.services, this.input, this.output).list()

    this.output.success('Serviço atualizado com sucesso')
  }
}
