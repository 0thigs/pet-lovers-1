import { UseCase } from './use-case'

export abstract class Update extends UseCase {
  public abstract update(): void
}
