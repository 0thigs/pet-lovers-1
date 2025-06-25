import { PetType } from '@/core/enums'
import type {
  ConsumedProduct,
  ConsumedService,
  Customer,
  Product,
  Service,
} from '../../entities'
import type { Input, Output } from '../../interfaces'
import { UseCase } from '../use-case'
import { ListProducts } from './list-products'
import { ListServices } from './list-services'

export class ListProductsAndServicesByMostComsumptionAndPetTypeUseCase extends UseCase {
  private customers: Customer[]

  constructor(customers: Customer[], input: Input, output: Output) {
    super(input, output)
    this.customers = customers
  }

  public async list(): Promise<void> {
    this.output.clear()

    const petType = await this.input.select('Escolha um tipo de pet', [
      ['cachorro', PetType.CACHORRO],
      ['gato', PetType.GATO],
      ['passaro', PetType.PASSARO],
      ['roedor', PetType.ROEDOR],
      ['reptil', PetType.REPTIL],
      ['peixe', PetType.PEIXE],
    ])
    this.listByType(petType as PetType)
  }

  private listByType(petType: PetType) {
    const consumedProducts = this.customers.flatMap((customer) =>
      customer.consumedProducts.filter((product) => product.pet.type === petType),
    )
    const consumedServices = this.customers.flatMap((customer) =>
      customer.consumedServices.filter((service) => service.pet.type === petType),
    )

    this.output.title(`Produtos mais consumidos por pets do tipo ${petType}`)
    this.listProductsByType(consumedProducts)
    this.output.title(`Serviços mais consumidos por pets do tipo ${petType}`)
    this.listServicesByType(consumedServices)
  }

  private listProductsByType(consumedProducts: ConsumedProduct[]) {
    const products: Product[] = []

    for (const consumedProduct of consumedProducts) {
      const productIndex = products.findIndex((currentProduct) =>
        currentProduct.isEqualTo(consumedProduct),
      )
      if (productIndex !== -1) {
        products[productIndex].incrementOrdersCount(consumedProduct.ordersCount)
        continue
      }
      products.push(consumedProduct)
    }

    products.sort((fisrtProduct, secondProduct) => {
      return secondProduct.ordersCount - fisrtProduct.ordersCount
    })
    const useCase = new ListProducts(products, this.input, this.output)
    useCase.list()
  }

  private listServicesByType(consumedServices: ConsumedService[]) {
    const services: Service[] = []

    for (const consumedService of consumedServices) {
      const serviceIndex = services.findIndex((currentService) =>
        currentService.isEqualTo(consumedService),
      )
      if (serviceIndex !== -1) {
        services[serviceIndex].incrementOrdersCount(consumedService.ordersCount)
        continue
      }
      services.push(consumedService)
    }

    services.sort((fisrtService, secondService) => {
      return secondService.ordersCount - fisrtService.ordersCount
    })
    const useCase = new ListServices(services, this.input, this.output)
    useCase.list()
  }
}
