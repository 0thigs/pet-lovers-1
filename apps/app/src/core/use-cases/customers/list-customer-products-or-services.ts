import type { Input, Output } from '@/core/interfaces'
import type { Customer } from '@/core/entities'
import { ListCustomers, ListProducts, ListServices } from '../listing'
import { List } from '../listing/list'

export class ListCustomerProductsOrServices extends List {
  private customers: Customer[]
  private isRunning: boolean

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
    this.isRunning = true
  }

  public async list() {
    this.output.clear()
    const customersList = new ListCustomers(this.customers, this.input, this.output)
    customersList.list()

    while (this.customers.length && this.isRunning) {
      const id = await this.input.text('ID do cliente:')

      const customer = this.customers.find((customer) => customer.id === id)

      if (!customer) {
        this.output.error('Cliente não encontrado')
        continue
      }

      const option = await this.input.select('Produto ou serviço?', [
        ['produto', 'product'],
        ['serviço', 'service'],
      ])

      switch (option) {
        case 'product': {
          const productsList = new ListProducts(
            customer.consumedProducts,
            this.input,
            this.output,
          )
          productsList.list()
          break
        }
        case 'service': {
          const servicesList = new ListServices(
            customer.consumedServices,
            this.input,
            this.output,
          )
          servicesList.list()
          break
        }
      }

      this.isRunning = false
    }
  }
}
