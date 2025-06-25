import type { Customer, Product, Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { List } from './list'
import { ListProducts } from './list-products'
import { ListServices } from './list-services'

export class ListProductsAndServicesByMostConsumption extends List {
  private products: Product[]
  private services: Service[]

  constructor(products: Product[], services: Service[], input: Input, output: Output) {
    super(input, output)
    this.products = products
    this.services = services
  }

  public list(): void {
    const sortedProducts = [...this.products].sort(
      (firstProduct, secondProduct) =>
        secondProduct.ordersCount - firstProduct.ordersCount,
    )

    const sortedServices = [...this.services].sort(
      (firstService, secondService) =>
        secondService.ordersCount - firstService.ordersCount,
    )

    const productsList = new ListProducts(sortedProducts, this.input, this.output)
    const servicesList = new ListServices(sortedServices, this.input, this.output)

    this.output.title('Produtos mais consumidos')
    productsList.list()
    this.output.title('Serviços mais consumidos')
    servicesList.list()
  }
}
