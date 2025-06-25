import type { Cpf } from './cpf'
import type { Phone } from './phone'
import type { Rg } from './rg'
import type { Pet } from './pet'
import { ConsumedProduct } from './consumed-produt'
import { ConsumedService } from './consumed-service'
import { EntityWithId } from './entity-with-id'
import type { Product } from './product'
import type { Service } from './service'

export type CustomerProps = {
  name: string
  socialName: string
  cpf: Cpf
  pets?: Pet[]
  rgs?: Rg[]
  phones?: Phone[]
  consumedProducts?: ConsumedProduct[]
  consumedServices?: ConsumedService[]
}

export class Customer extends EntityWithId {
  public name: string
  public socialName: string
  private _cpf: Cpf
  private _registrationDate: Date
  private _rgs: Rg[]
  private _phones: Phone[]
  private _consumedProducts: ConsumedProduct[]
  private _consumedServices: ConsumedService[]
  private _pets: Pet[]

  constructor(props: CustomerProps) {
    super()
    this.name = props.name
    this.socialName = props.socialName
    this._cpf = props.cpf
    this._rgs = props.rgs ?? []
    this._phones = props.phones ?? []
    this._consumedProducts = props.consumedProducts ?? []
    this._consumedServices = props.consumedServices ?? []
    this._pets = props.pets ?? []
    this._registrationDate = new Date()
  }

  public consumeProduct(_product: Product, pet: Pet) {
    const consumedProduct = new ConsumedProduct({
      id: _product.id,
      name: _product.name,
      price: _product.priceAsNumber,
      description: _product.description,
      ordersCount: _product.ordersCount,
      pet,
    })

    const product = Object.assign(
      Object.create(Object.getPrototypeOf(consumedProduct)),
      consumedProduct,
    )
    const productIndex = this._consumedProducts.findIndex((currentProduct) =>
      currentProduct.isEqualTo(product),
    )

    if (productIndex === -1) {
      product.resetOrdersCount()
      product.incrementOrdersCount()
      this._consumedProducts.push(product)
      return
    }

    product.incrementOrdersCount()
    this._consumedProducts[productIndex] = product
  }

  public consumeService(_service: Service, pet: Pet) {
    const consumedService = new ConsumedService({
      id: _service.id,
      name: _service.name,
      price: _service.priceAsNumber,
      description: _service.description,
      ordersCount: _service.ordersCount,
      pet,
    })

    const service = Object.assign(
      Object.create(Object.getPrototypeOf(consumedService)),
      consumedService,
    )
    const serviceIndex = this._consumedServices.findIndex((currentService) =>
      currentService.isEqualTo(service),
    )

    if (serviceIndex === -1) {
      service.resetOrdersCount()
      service.incrementOrdersCount(1)
      this._consumedServices.push(service)
      return
    }

    const cosumedService = this._consumedServices[serviceIndex]
    cosumedService.incrementOrdersCount(1)
    this._consumedServices[serviceIndex] = cosumedService
  }

  public hasRg(rgValue: string): boolean {
    return this.rgs.map((rg) => rg.value).includes(rgValue)
  }

  public hasPhone(phoneNumber: string): boolean {
    return this.phones.map((phone) => phone.number).includes(phoneNumber)
  }

  public addPet(pet: Pet) {
    this._pets.push(pet)
  }

  public updatePet(pet: Pet) {
    const petIndex = this._pets.findIndex((currentPet) => currentPet.isEqualTo(pet))
    this._pets[petIndex] = pet
  }

  public deletePet(pet: Pet) {
    const petIndex = this._pets.findIndex((currentPet) => currentPet.isEqualTo(pet))
    this._pets.splice(petIndex, 1)
  }

  public hasPet(pet: Pet): boolean {
    return this._pets.some((currentPet) => currentPet.isEqualTo(pet))
  }

  public get consumedProductsOrServicesCount(): number {
    return this.consumedProductsCount + this.consumedServicesCount
  }

  public get spending(): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(this.spendingInProducts + this.spendingInServices)
  }

  public get spendingAsNumber(): number {
    return this.spendingInProducts + this.spendingInServices
  }

  public get consumedProductsCount(): number {
    return this.consumedProducts.reduce(
      (count, product) => count + product.ordersCount,
      0,
    )
  }

  public get consumedServicesCount(): number {
    return this.consumedServices.reduce(
      (count, service) => count + service.ordersCount,
      0,
    )
  }

  public get spendingInProducts(): number {
    return this.consumedProducts.reduce(
      (spending, product) => spending + product.priceAsNumber * product.ordersCount,
      0,
    )
  }

  public get spendingInServices(): number {
    return this.consumedServices.reduce(
      (spending, service) => spending + service.priceAsNumber * service.ordersCount,
      0,
    )
  }

  public get cpf(): Cpf {
    return this._cpf
  }

  public set cpf(cpf: Cpf) {
    this._cpf = cpf
  }

  public get rgs(): Rg[] {
    return this._rgs
  }

  public get pets(): Pet[] {
    return this._pets
  }

  public get registrationDate(): Date {
    return this._registrationDate
  }

  public get phones(): Phone[] {
    return this._phones
  }

  public get consumedProducts(): ConsumedProduct[] {
    return this._consumedProducts
  }

  public get consumedServices(): ConsumedService[] {
    return this._consumedServices
  }
}
