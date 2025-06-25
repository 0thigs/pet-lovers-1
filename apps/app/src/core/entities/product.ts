import { EntityWithId } from './entity-with-id'

export type ProductProps = {
  id?: string
  name: string
  price: number
  description: string
  ordersCount: number
}

export class Product extends EntityWithId {
  private _name: string
  private _price: number
  private _description: string
  private _ordersCount: number

  constructor(props: ProductProps) {
    super(props.id)
    this._name = props.name
    this._price = props.price
    this._description = props.description
    this._ordersCount = props.ordersCount
  }

  public get name() {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  public get price(): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(this._price)
  }

  public get priceAsNumber() {
    return Number(this._price)
  }

  public set price(price: number) {
    this._price = price
  }

  public get description(): string {
    return this._description
  }

  public set description(description: string) {
    this._description = description
  }

  public get ordersCount(): number {
    return this._ordersCount
  }

  public resetOrdersCount() {
    this._ordersCount = 0
  }

  public incrementOrdersCount(count = 1) {
    this._ordersCount += count
  }
}
