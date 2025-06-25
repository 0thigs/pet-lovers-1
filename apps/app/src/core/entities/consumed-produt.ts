import type { Pet } from './pet'
import { Product, type ProductProps } from './product'

export type ConsumedProductProps = ProductProps & {
  pet: Pet
}

export class ConsumedProduct extends Product {
  private _pet: Pet

  constructor(props: ConsumedProductProps) {
    super(props)
    this._pet = props.pet
  }

  public get pet() {
    return this._pet
  }
}
