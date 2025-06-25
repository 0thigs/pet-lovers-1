import type { Pet } from './pet'
import { Service, type ServiceProps } from './service'

export type ConsumedServiceProps = ServiceProps & {
  pet: Pet
}

export class ConsumedService extends Service {
  private _pet: Pet

  constructor(props: ConsumedServiceProps) {
    super(props)
    this._pet = props.pet
  }

  public get pet() {
    return this._pet
  }
}
