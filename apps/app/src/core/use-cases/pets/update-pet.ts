import type { Customer, Pet } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Update } from '../update'
import { ListPets } from '../listing/list-pets'
import { Validator } from '@/core/utils'

export class UpdatePet extends Update {
  private isRunning = true
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async update(): Promise<void> {
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

      await this.updatePet(pet)
      this.isRunning = false
    }
  }

  private async updatePet(pet: Pet): Promise<void> {
    const option = await this.input.select('Escolha uma opção para atualizar:', [
      ['Nome', 'name'],
      ['Tipo', 'type'],
      ['Raça', 'breed'],
      ['Gênero', 'gender'],
      ['Voltar', 'back'],
    ])

    const validator = new Validator(this.output)

    switch (option) {
      case 'name':
        {
          let name = ''
          while (true) {
            name = await this.input.text('Novo nome do pet:')
            if (!validator.validateText(name)) {
              this.output.error('Nome é obrigatório')
              continue
            }
            break
          }
          pet.name = name
        }
        break
      case 'type':
        {
          const type = await this.input.select('Tipo:', [
            ['cachorro'],
            ['gato'],
            ['ave'],
            ['roedor'],
            ['reptil'],
            ['peixe'],
          ])
          pet.type = type
        }
        break
      case 'breed':
        {
          let breed = ''
          while (true) {
            breed = await this.input.text('Nova raça do pet:')
            if (!validator.validateText(breed)) {
              this.output.error('Raça é obrigatória')
              continue
            }
            break
          }
          pet.breed = breed
        }
        break
      case 'gender':
        {
          const gender = await this.input.select('Gênero:', [['macho'], ['fêmea']])
          pet.gender = gender
        }
        break
      case 'back':
        return
      default:
        this.output.error('Opção inválida')
    }

    const customer = this.customers.find((customer) => customer.hasPet(pet))
    if (!customer) return

    customer.updatePet(pet)

    this.output.clear()

    new ListPets(this.customers, this.input, this.output).list()

    this.output.success('Pet atualizado com sucesso')
  }
}
