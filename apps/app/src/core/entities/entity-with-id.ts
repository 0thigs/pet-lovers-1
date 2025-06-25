import { v4 as generateId } from 'uuid'

export class EntityWithId {
  private _id: string

  constructor(id?: string) {
    this._id = id ?? generateId().slice(0, 4)
  }

  public get id(): string {
    return this._id
  }

  isEqualTo(entity: EntityWithId): boolean {
    return this.id === entity.id
  }
}
