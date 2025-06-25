import type { Customer } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'
import { ListCustomers } from './list-customers'

export class ListCustomersByMostSpeding extends List {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    const sortedCustomers = [...this.customers]
      .sort((fisrtCustomer, secondCustomer) => {
        return secondCustomer.spendingAsNumber - fisrtCustomer.spendingAsNumber
      })
      .slice(0, 5)

    const useCase = new ListCustomers(sortedCustomers, this.input, this.output)
    useCase.list()
  }
}
