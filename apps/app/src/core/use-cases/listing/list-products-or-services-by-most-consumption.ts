import type { Customer, Product, Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'
import { ListProducts } from './list-products'
import { ListServices } from './list-services'

type ConsumedMap = {
  [key: string]: number
}

export class ListCustomersByMostProductsOrServicesConsumption extends List {
  private customers: Customer[]
  private consumedProducts: Product[] = []
  private consumedServices: Service[] = []

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public list(): void {
    const consumedProductsMap: ConsumedMap = {}
    const consumedServicesMap: ConsumedMap = {}

    for (const customer of this.customers) {
      for (const product of customer.consumedProducts) {
        if (!(product.id in consumedProductsMap)) {
          consumedProductsMap[product.id] = consumedProductsMap[product.id] + 1
        }
      }

      for (const service of customer.consumedServices) {
        if (!(service.id in consumedServicesMap)) {
          consumedServicesMap[service.id] = consumedServicesMap[service.id] + 1
        }
      }
    }

    this.consumedProducts.sort(
      (firstProduct, secondProduct) =>
        consumedProductsMap[firstProduct.id] - consumedProductsMap[secondProduct.id],
    )

    this.consumedServices.sort(
      (firstService, secondService) =>
        consumedServicesMap[firstService.id] - consumedServicesMap[secondService.id],
    )

    const productsList = new ListProducts(this.consumedProducts, this.input, this.output)
    const servicesList = new ListServices(this.consumedServices, this.input, this.output)

    this.output.title('Produtos mais consumidos')
    productsList.list()
    this.output.title('Serviços mais consumidos')
    servicesList.list()
  }
}
