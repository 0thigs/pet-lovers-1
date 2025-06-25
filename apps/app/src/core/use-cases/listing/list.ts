import { UseCase } from '../use-case'

export abstract class List extends UseCase {
  public abstract list(): void
}
