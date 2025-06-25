import { Validator } from '@/core/utils'
import { Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Register } from '../register'
import { ListServices } from '../listing'

export class RegisterService extends Register {
  private services: Service[]

  constructor(services: Service[], input: Input, output: Output) {
    super(input, output)
    this.services = services
  }

  public async register(): Promise<void> {
    const validator = new Validator(this.output)
    this.output.clear()
    let name = ''
    let description = ''
    let price = ''

    while (true) {
      name = await this.input.text('Nome do serviço:')
      if (!validator.validateText(name)) {
        this.output.error('Nome é obrigatório')
        continue
      }
      break
    }

    while (true) {
      description = await this.input.text('Descrição do serviço:')
      if (!validator.validateText(description)) {
        this.output.error('Descrição é obrigatória')
        continue
      }
      break
    }

    while (true) {
      price = await this.input.text('Preço do serviço:')
      if (!validator.validateNumber(price)) {
        continue
      }
      break
    }

    const service = new Service({ name, description, price: Number(price), ordersCount: 0 })

    this.services.push(service)
    this.output.clear()

    new ListServices(this.services, this.input, this.output).list()

    this.output.success('Serviço cadastrado com sucesso')
  }
}
