import type { Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'

export class ListServices extends List {
  private services: Service[]

  constructor(services: Service[], input: Input, output: Output) {
    super(input, output)
    this.services = services
  }

  public list(): void {
    if (!this.services.length) {
      this.output.error('Nenhum serviço encontrado')
      return
    }

    this.output.table(
      this.services.map((service) => ({
        ID: service.id,
        Nome: service.name,
        Preco: service.price,
        Descrição: service.description,
        'Qtd. de vezes que esse serviço foi consumido': service.ordersCount,
      })),
    )
  }
}
