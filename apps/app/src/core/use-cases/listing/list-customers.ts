import type { Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'

export class ListCustomers extends List {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    if (!this.customers.length) {
      this.output.error('Nenhum cliente encontrado')
      return
    }

    this.output.table(
      this.customers.map((customer) => ({
        ID: customer.id,
        Nome: customer.name,
        CPF: customer.cpf.format,
        Telefones: customer.phones.map((phone) => phone.value).join(', '),
        'Nome social': customer.socialName === '' ? '----' : customer.socialName,
        "RG's": customer.rgs.map((rg) => rg.format).join(', '),
        'Consumo em quantidade': customer.consumedProductsOrServicesCount,
        'Consumo em R$': customer.spending,
        Pets:
          customer.pets.length === 0
            ? '---'
            : customer.pets
                .map((pet) => `${pet.name} - ${pet.type} (${pet.breed})`)
                .join(';'),
      })),
    )
  }
}
