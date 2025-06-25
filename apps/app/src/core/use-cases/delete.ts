import { UseCase } from './use-case'

export abstract class Delete extends UseCase {
  public abstract delete(): void
}
