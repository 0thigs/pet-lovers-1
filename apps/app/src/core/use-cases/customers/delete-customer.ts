import type { Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Delete } from '../delete'
import { ListCustomers } from '../listing'

export class DeleteCustomer extends Delete {
  private isRunning = true
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async delete(): Promise<void> {
    this.output.clear()
    const customersList = new ListCustomers(this.customers, this.input, this.output)
    customersList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do customer:')

      const customer = this.customers.find((customer) => customer.id === id)

      if (!customer) {
        this.output.error('Customer não encontrado')
        continue
      }

      await this.deleteCustomer(customer)
      this.isRunning = false
    }
  }

  private async deleteCustomer(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex((currentCustomer) =>
      currentCustomer.isEqualTo(customer),
    )
    this.customers.splice(customerIndex, 1)

    this.output.clear()

    new ListCustomers(this.customers, this.input, this.output).list()

    this.output.success('Customer deletado com sucesso')
  }
}
