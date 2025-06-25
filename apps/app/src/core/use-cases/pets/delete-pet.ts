import type { Customer, Pet } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Delete } from '../delete'
import { ListPets } from '../listing'

export class DeletePet extends Delete {
  private isRunning = true
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async delete(): Promise<void> {
    this.output.clear()
    const petsList = new ListPets(this.customers, this.input, this.output)
    const hasPets = petsList.list()
    if (!hasPets) return

    while (this.isRunning) {
      const id = await this.input.text('ID do pet:')

      const pet = this.customers
        .flatMap((customer) => customer.pets)
        .find((pet) => pet.id === id)

      if (!pet) {
        this.output.error('Pet não encontrado')
        continue
      }

      await this.deletePet(pet)
      this.isRunning = false
    }
  }

  public async deletePet(pet: Pet): Promise<void> {
    const customer = this.customers.find((customer) => customer.hasPet(pet))
    if (!customer) return

    customer.deletePet(pet)

    this.output.clear()

    new ListPets(this.customers, this.input, this.output).list()

    this.output.success('Pet deletado com sucesso')
  }
}
