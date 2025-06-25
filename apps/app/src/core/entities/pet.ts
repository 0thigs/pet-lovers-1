import { EntityWithId } from './entity-with-id'

export type PetProps = {
  id?: string
  name: string
  type: string
  breed: string
  gender: string
}

export class Pet extends EntityWithId {
  private _name: string
  private _type: string
  private _breed: string
  private _gender: string

  constructor(props: PetProps) {
    super(props.id)
    this._name = props.name
    this._type = props.type
    this._breed = props.breed
    this._gender = props.gender
  }

  public get name(): string {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  public get type(): string {
    return this._type
  }

  public set type(type: string) {
    this._type = type
  }

  public get breed(): string {
    return this._breed
  }

  public set breed(breed: string) {
    this._breed = breed
  }

  public get gender(): string {
    return this._gender
  }

  public set gender(gender: string) {
    this._gender = gender
  }
}
