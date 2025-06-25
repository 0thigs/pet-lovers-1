import type { Customer, Pet, Product, Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { UseCase } from '../use-case'
import { ListCustomers, ListPets, ListProducts, ListServices } from '../listing'

export class ConsumeProductrOrService extends UseCase {
  private isRunning = true
  private customers: Customer[]
  private products: Product[]
  private services: Service[]

  constructor(
    customers: Customer[],
    products: Product[],
    services: Service[],
    input: Input,
    output: Output,
  ) {
    super(input, output)
    this.customers = customers
    this.products = products
    this.services = services
  }

  async consume() {
    const customersList = new ListCustomers(this.customers, this.input, this.output)
    customersList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do cliente:')

      const customer = this.customers.find((customer) => customer.id === id)

      if (!customer) {
        this.output.error('Cliente não encontrado')
        continue
      }

      if (!customer.pets.length) {
        this.output.error('Cliente não possui pets')
        this.isRunning = false
        break
      }

      const petsList = new ListPets([customer], this.input, this.output)
      petsList.list()

      let pet: Pet | undefined

      while (true) {
        const id = await this.input.text('ID do pet:')

        pet = customer.pets.find((pet) => pet.id === id)

        if (!pet) {
          this.output.error('Pet não encontrado')
          continue
        }

        break
      }

      const option = await this.input.select('Produto ou serviço?', [
        ['produto', 'product'],
        ['serviço', 'service'],
      ])

      switch (option) {
        case 'product': {
          await this.addProduct(customer, pet)
          break
        }
        case 'service': {
          await this.addService(customer, pet)
          break
        }
      }

      new ListCustomers(this.customers, this.input, this.output).list()
      this.isRunning = false
    }
  }

  async addProduct(customer: Customer, pet: Pet) {
    const productsList = new ListProducts(this.products, this.input, this.output)
    productsList.list()

    if (!this.products.length) return

    while (true) {
      const id = await this.input.text('ID do produto:')

      const productIndex = this.products.findIndex((product) => product.id === id)

      if (productIndex === -1) {
        this.output.error('Produto não encontrado')
        continue
      }

      let quantity = 0

      while (true) {
        quantity = await this.input.number('Quantidade:')
        if (quantity > 0) {
          break
        }
        this.output.error('Quantidade inválida')
      }

      const product = this.products[productIndex]

      for (let i = 0; i < quantity; i++) {
        customer.consumeProduct(product, pet)
        product.incrementOrdersCount(1)
        this.products[productIndex] = product
      }

      this.output.clear()
      this.output.success(
        `Produto ${product.id} pedido ao cliente ${customer.id} com sucesso`,
      )
      break
    }
  }

  async addService(customer: Customer, pet: Pet) {
    const servicesList = new ListServices(this.services, this.input, this.output)
    servicesList.list()

    if (!this.services.length) return

    while (true) {
      const id = await this.input.text('ID do serviço:')

      const serviceIndex = this.services.findIndex((product) => product.id === id)

      if (serviceIndex === -1) {
        this.output.error('Serviço não encontrado')
        continue
      }

      let quantity = 0

      while (true) {
        quantity = await this.input.number('Quantidade:')
        if (quantity > 0) {
          break
        }
        this.output.error('Quantidade inválida')
      }

      const service = this.services[serviceIndex]

      for (let i = 0; i < quantity; i++) {
        customer.consumeService(service, pet)
        service.incrementOrdersCount(1)
        this.services[serviceIndex] = service
      }

      this.output.clear()
      this.output.success(
        `Serviço ${service.id} pedido ao cliente ${customer.id} com sucesso`,
      )
      break
    }
  }
}
