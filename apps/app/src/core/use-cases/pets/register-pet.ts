import { Validator } from '@/core/utils'
import { type Customer, Pet } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Register } from '../register'
import { ListCustomers } from '../listing'
import { PetType } from '../../enums'

export class RegisterPet extends Register {
  private isRunning = true
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async register(): Promise<void> {
    this.output.clear()
    const customersList = new ListCustomers(this.customers, this.input, this.output)
    customersList.list()
    if (!this.customers.length) {
      this.output.error('Nenhum cliente cadastrado')
      return
    }

    while (this.isRunning) {
      const id = await this.input.text('ID do cliente:')

      const customer = this.customers.find((customer) => customer.id === id)

      if (!customer) {
        this.output.error('Cliente não encontrado')
        continue
      }

      await this.registerPet(customer)
      this.isRunning = false
    }
  }

  private async registerPet(customer: Customer): Promise<void> {
    const validator = new Validator(this.output)
    let name = ''
    let type = ''
    let breed = ''
    let gender = ''

    while (true) {
      name = await this.input.text('Nome do pet:')
      if (!validator.validateText(name)) {
        this.output.error('Nome é obrigatório')
        continue
      }
      break
    }

    type = await this.input.select('Tipo:', [
      ['cachorro', PetType.CACHORRO],
      ['gato', PetType.GATO],
      ['ave', PetType.PASSARO],
      ['roedor', PetType.ROEDOR],
      ['reptil', PetType.REPTIL],
      ['peixe', PetType.PEIXE],
    ])

    while (true) {
      breed = await this.input.text('Raça do pet:')
      if (!validator.validateText(breed)) {
        this.output.error('Raça é obrigatória')
        continue
      }
      break
    }

    gender = await this.input.select('Gênero:', [['macho'], ['fêmea']])

    const pet = new Pet({ name, type, breed, gender })
    customer.addPet(pet)

    this.output.clear()
    this.output.success('Pet cadastrado com sucesso')
  }
}
