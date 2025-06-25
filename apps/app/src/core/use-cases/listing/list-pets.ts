import type { Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'

export class ListPets extends List {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): boolean {
    if (!this.customers.length) {
      this.output.error('Nenhum cliente cadastrado para haver um pet cadastrado')
      return false
    }

    const pets = this.customers.flatMap((customer) =>
      customer.pets.map((pet) => ({
        id: pet.id,
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        gender: pet.gender,
        ownerId: customer.id,
        ownerName: customer.name,
      })),
    )

    if (!pets.length) {
      this.output.error('Nenhum pet cadastrado')
      return false
    }

    this.output.table(
      pets.map((pet) => ({
        ID: pet.id,
        Nome: pet.name,
        Tipo: pet.type,
        Raça: pet.breed,
        Gênero: pet.gender,
        'ID do dono': pet.ownerId,
        'Nome do dono': pet.ownerName,
      })),
    )

    return true
  }
}
